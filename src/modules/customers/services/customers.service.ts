import { BadRequestException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { RequestContext } from '../../common/auth/middlewares';
import { allowedImageMimes, allowedPDFMimes } from '../../common/shared/constants/allowed-mimetypes';
import { UploadService } from '../../common/shared/services';
import SizeConverter from '../../common/shared/utils/size-converter';
import { ContractsService } from '../../contracts/services/contracts.service';
import Funnel from '../../funnel/entities/funnel.entity';
import { FunnelRepository } from '../../funnel/repositories/funnel.repository';
import { UserRepository } from '../../users/repositories/user.repository';
import { AccessProfiles } from '../../common/shared/constants/access-profiles';
import Contact from '../contact/entities/contact.entity';
import { ContactRepository } from '../contact/repositories/contact.repository';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerFilesDTO } from '../dto/files.dto';
import { FindCustomerDTO } from '../dto/find-customer.dto';
import FindQueryDTO from '../dto/list-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import Logo from '../logo/entities/logo.entity';
import { LogoRepository } from '../logo/repositories/logo.repository';
import { CustomerRepository } from '../repositories/customer.repository';

@Injectable()
export class CustomersService {
  constructor(
    private readonly contactRepository: ContactRepository,
    private readonly contractService: ContractsService,
    private readonly customerRepository: CustomerRepository,
    private readonly funnelRepository: FunnelRepository,
    private readonly uploadRepository: LogoRepository,
    private readonly uploadService: UploadService,
    private readonly userRepository: UserRepository
  ) { }

  async create(createCustomerDto: CreateCustomerDto, files: CustomerFilesDTO) {
    try {
      let uploadedLogoInfos: Logo = null;
      if (files?.logo && files?.logo[0]) {
        if (files.logo[0].size > SizeConverter.megabytesToBytes(20)) {
          throw new BadRequestException(
            'A logo enviada tem tamanho maior que o permitido.'
          );
        }

        if (!allowedImageMimes.includes(files.logo[0].mimetype)) {
          throw new BadRequestException(
            'O formato de imagem enviado não é permitido.'
          );
        }
      }

      if (files?.contracts) {
        files?.contracts?.forEach((contract) => {
          if (contract.size > SizeConverter.megabytesToBytes(10)) {
            throw new BadRequestException(
              'O Contrato enviado tem tamanho maior que o permitido.'
            );
          }
          if (!allowedPDFMimes.includes(contract.mimetype)) {
            throw new BadRequestException(
              'O formato de contrato enviado não é permitido.'
            );
          }
        });
      }

      if (RequestContext.currentUser()) {
        const { name, middle_name, id } = RequestContext.currentUser();
        const sender_name = `${name} ${middle_name}`
          ?.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        createCustomerDto.created_by = sender_name;
        createCustomerDto.username_id = id;

        const user = await this.userRepository.findOne({
          where: {
            email: RequestContext.currentUser().email
          }
        });

        if (!user) {
          throw new BadRequestException('Usuário não foi encontrado.');
        }

        createCustomerDto.creator_id = user.id;
      }

      const exists = await this.customerRepository.findOne({
        where: { document: createCustomerDto.document }
      });

      if (createCustomerDto.document && exists)
        return new BadRequestException('Documento já cadastrado');

      if (createCustomerDto.funnelsId?.length > 0) {
        const funnels: Array<Funnel> = [];
        await Promise.all(
          createCustomerDto.funnelsId?.map(async (fun) => {
            const found = await this.funnelRepository.findOne(fun);
            if (found) {
              funnels.push(found);
            }
          })
        );
        createCustomerDto.funnels = funnels;
      }
      const customer = await this.customerRepository.createCustomer(
        createCustomerDto
      );

      if (files?.logo && files?.logo[0]) {
        const uploadedLogo = await this.uploadService.uploadFile(
          files.logo[0],
          customer.id
        );

        uploadedLogoInfos = await this.uploadRepository.uploadFile({
          name: files.logo[0].originalname,
          url: uploadedLogo.Location,
          customer
        });

        await this.customerRepository.update(customer.id, {
          logo: uploadedLogoInfos
        });
      }

      if (files?.contracts) {
        await this.contractService.createContract(files?.contracts, {
          expiration_date: createCustomerDto.expiration_date,
          customer_id: customer.id,
          observations: createCustomerDto.observations
        });
      }

      return { ...customer, logo: uploadedLogoInfos };
    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }

  async findAll(query: FindQueryDTO) {
    try {
      return await this.customerRepository.listCustomersByQuery(query);
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findOne(data: FindCustomerDTO) {
    try {
      return await this.customerRepository.findOne(
        { id: data.id },
        { relations: ['contacts', 'contracts', 'logo', 'contacts.vacancies'] }
      );
    } catch (error) {
      throw new NotFoundException(error)
    }
  }

  async findExistingCustomer(
    document?: string,
    email?: string,
    phone?: string
  ) {
    const get = await this.customerRepository.findExistingCustomerByFields(document, email, phone);
    if (get.exists === true) {
      throw new BadRequestException(
        'Já existe cliente com CNPJ ou EMAIL ou TELEFONE'
      );
    }
    return false;
  }

  private async saveContacts(
    customerId: string,
    alreadySavedContacts: Contact[],
    requestContacts?: Contact[]
  ): Promise<void> {
    if ((!requestContacts || requestContacts?.length === 0) && alreadySavedContacts?.length > 0) {
      for await (let contact of alreadySavedContacts) {
        await this.contactRepository.update({ id: contact.id }, { active: false })
      }
      return;
    }

    const contactsToDisable = alreadySavedContacts.filter(contact => !requestContacts.find((req) => req.email == contact.email))
    for await (let contact of contactsToDisable) {
      await this.contactRepository.update({ id: contact.id }, { active: false })
    }
    const newContacts = requestContacts.filter(contact => !alreadySavedContacts.find((req) => req.email === contact.email))
    let contactsToReactivate = requestContacts.filter(contact => alreadySavedContacts.find((req) => (req.email === contact.email) && (req.active == false || req.active == null)))
    for await (let contact of contactsToReactivate) {
      const id = alreadySavedContacts.find((savedcontact) => savedcontact.email === contact.email).id
      Object.assign(contact, { active: true }, { id })
      delete contact.vacancies
      await this.contactRepository.update({ id: contact.id }, contact)
    }
    if (newContacts?.length > 0) {
      const contactsToSave = newContacts.map((contact) => ({
        ...contact,
        customerId
      }));
      await this.contactRepository.createContactInBulk(contactsToSave);
    }
  }

  async updateCustomer(
    accessLevel: Array<AccessProfiles>,
    id: string,
    updateCustomerDto: UpdateCustomerDto,
    files: CustomerFilesDTO
  ) {
    try {
      if (files?.logo && files?.logo[0]) {
        if (files.logo[0].size > SizeConverter.megabytesToBytes(20)) {
          throw new BadRequestException(
            'A logo enviada tem tamanho maior que o permitido.'
          );
        }

        if (!allowedImageMimes.includes(files.logo[0].mimetype)) {
          throw new BadRequestException(
            'O formato de imagem enviado não é permitido.'
          );
        }
      }

      if (files?.contracts) {
        files?.contracts?.forEach((contract) => {
          if (contract.size > SizeConverter.megabytesToBytes(10)) {
            throw new BadRequestException(
              'O Contrato enviado tem tamanho maior que o permitido.'
            );
          }
          if (!allowedPDFMimes.includes(contract.mimetype)) {
            throw new BadRequestException(
              'O formato de contrato enviado não é permitido.'
            );
          }
        });
      }

      const client = await this.findOne({ id: id });

      if (!client) {
        throw new BadRequestException('Cliente não encontrado!');
      }

      if (client?.contacts) {
        if (!updateCustomerDto.contacts) {
          updateCustomerDto.contacts = []
        }
        await this.saveContacts(
          client.id,
          client?.contacts,
          updateCustomerDto?.contacts
        );
      }
      if (RequestContext.currentUser()) {
        const user = await this.userRepository.findOne({
          where: {
            email: RequestContext.currentUser().email
          }
        });

        if (!user) {
          throw new BadRequestException('Usuário não foi encontrado.');
        }

        if (accessLevel.includes(AccessProfiles.COMMERCIAL)) {
          if (client.creator_id !== user.id) {
            throw new NotAcceptableException();
          }
        }
      }

      const { document, email, phone } = updateCustomerDto;

      if (document || email || phone) {
        const exists = await this.customerRepository.findExistingCustomerByFields(
          document,
          email,
          phone
        );
        if (exists.exists && exists.id !== id) {
          throw new BadRequestException(
            'Já existe cliente com CNPJ ou EMAIL ou TELEFONE'
          );
        }
      }

      if (updateCustomerDto.funnelsId?.length > 0) {
        const funnels: Array<Funnel> = [];
        await Promise.all(
          updateCustomerDto.funnelsId?.map(async (fun) => {
            const found = await this.funnelRepository.findOne(fun);
            if (found) {
              funnels.push(found);
            }
          })
        );
        updateCustomerDto.funnels = funnels;
      }

      const customer = await this.customerRepository.updateCustomer(id, {
        ...updateCustomerDto,
        creator_id: client.creator_id
      });

      let updatedLogo;

      if (files?.logo) {
        if (files?.logo[0]) {
          const uploadedLogo = await this.uploadService.uploadFile(
            files.logo[0],
            id
          );
          const uploadedLogoInfos = await this.uploadRepository.uploadFile({
            name: files.logo[0].originalname,
            url: uploadedLogo.Location,
            customer
          });

          updatedLogo = await this.customerRepository.update(customer.id, {
            logo: uploadedLogoInfos
          });
          if (updatedLogo) {
            updatedLogo = uploadedLogoInfos;
          }
        }
      } else {
        updatedLogo = customer.logo;
      }

      if (files?.contracts) {
        await this.contractService.createContract(files?.contracts, {
          expiration_date: updateCustomerDto.expiration_date,
          customer_id: customer.id,
          observations: updateCustomerDto.observations,
          alreadyUploaded: updateCustomerDto.alreadyUploaded
        });
      }

      return { ...customer, logo: updatedLogo };
    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }

  async changeCustomerStatus(
    id: string,
    active = false,
    accessLevel: Array<string>
  ) {
    try {
      const client = await this.findOne({ id: id });
      const { name, middle_name } = RequestContext.currentUser();
      const created_by = `${name} ${middle_name}`
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      if (accessLevel.includes('Comercial') && client.created_by != created_by) {
        throw new NotAcceptableException();
      }
      const changeStatus = await this.customerRepository.update(id, { active });
      return changeStatus;
    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }

  // verificado se o CNPJ está correto
  async check(data): Promise<boolean> {
    const value = data;
    if (!value) return false;

    // Aceita receber o valor como string, número ou array com todos os dígitos
    const isString = typeof value === 'string';
    const validTypes =
      isString || Number.isInteger(value) || Array.isArray(value);

    // Elimina valor em formato inválido
    if (!validTypes) return false;

    // Filtro inicial para entradas do tipo string
    if (isString) {
      // Limita ao máximo de 18 caracteres, para CNPJ formatado
      if (value.length > 18) return false;

      // Teste Regex para veificar se é uma string apenas dígitos válida
      const digitsOnly = /^\d{14}$/.test(value);
      // Teste Regex para verificar se é uma string formatada válida
      const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value);

      // Se o formato é válido, usa um truque para seguir o fluxo da validação
      if (digitsOnly || validFormat) true;
      // Se não, retorna inválido
      else return false;
    }

    // Guarda um array com todos os dígitos do valor
    const match = value.toString().match(/\d/g);
    const numbers = Array.isArray(match) ? match.map(Number) : [];

    // Valida a quantidade de dígitos
    if (numbers.length !== 14) return false;

    // Elimina inválidos com todos os dígitos iguais
    const items = [...new Set(numbers)];
    if (items.length === 1) return false;

    // Cálculo validador
    const calc = (x) => {
      const slice = numbers.slice(0, x);
      let factor = x - 7;
      let sum = 0;

      for (let i = x; i >= 1; i--) {
        const n = slice[x - i];
        sum += n * factor--;
        if (factor < 2) factor = 9;
      }

      const result = 11 - (sum % 11);

      return result > 9 ? 0 : result;
    };

    // Separa os 2 últimos dígitos de verificadores
    const digits = numbers.slice(12);

    // Valida 1o. dígito verificador
    const digit0 = calc(12);
    if (digit0 !== digits[0]) return false;

    // Valida 2o. dígito verificador
    const digit1 = calc(13);
    return digit1 === digits[1];
  }
}
