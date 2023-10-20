import { BadRequestException, Body, Controller, Get, Headers, Param, Patch, Post, Put, Query, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuditRepository } from '../../audit/repositories';
import { Groups } from '../../common/auth/decorators/groups.decorator';
import { TokenDecode } from '../../common/auth/helpers/token-decode.helper';
import { RequestContext } from '../../common/auth/middlewares';
import { TokenPayload } from '../../common/auth/models/token-payload.model';
import { AccessProfiles } from '../../common/shared/constants/access-profiles';
import SizeConverter from '../../common/shared/utils/size-converter';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerFilesDTO } from '../dto/files.dto';
import { FindCustomerDTO } from '../dto/find-customer.dto';
import findExistingCustomerDTO from '../dto/find-existing-customer.dto';
import FindQueryDTO from '../dto/list-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Controller('customers')
@ApiTags("customers")
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly auditRepository: AuditRepository
  ) { }

  @Post()
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'logo', maxCount: 1 }, { name: 'contracts' }],
      {
        limits: { fileSize: SizeConverter.megabytesToBytes(20) }
      }
    )
  )
  async create(
    @UploadedFiles()
    files: CustomerFilesDTO,
    @Body() createCustomerDto: CreateCustomerDto
  ) {
    try {
      if (createCustomerDto.document) await this.customersService.findExistingCustomer(createCustomerDto.document);
      const createdCustomer = await this.customersService.create(createCustomerDto, files);
      const event = RequestContext.currentevent();
      if (event) await this.auditRepository.createAudit(event);
      return createdCustomer;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get()
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async findAll(@Query() { name, records_per_page, page, active }: FindQueryDTO) {
    try {
      return await this.customersService.findAll({ name, records_per_page, page, active });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get('existing')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async findExistingCustomer(@Query() { document, email, phone }: findExistingCustomerDTO) {
    try {
      return await this.customersService.findExistingCustomer(document, email, phone);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get(':id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async findOne(@Param() params: FindCustomerDTO) {
    try {
      return await this.customersService.findOne(params);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Put(':id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'logo', maxCount: 1 }, { name: 'contracts' }],
      {
        limits: { fileSize: SizeConverter.megabytesToBytes(20) }
      }
    )
  )
  async updateCustomer(
    @Req() request: Request,
    @Param('id') id: string,
    @UploadedFiles() files: CustomerFilesDTO,
    @Body() updateCustomerDto: UpdateCustomerDto
  ) {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];

      const tokenPayload = TokenDecode.decode<TokenPayload>(token);

      const customer = await this.customersService.updateCustomer(
        tokenPayload['cognito:groups'],
        id,
        updateCustomerDto,
        files
      );
      const event = RequestContext.currentevent();
      if (event && event?.event_description?.length) {
        await this.auditRepository.createAudit(event);
      }
      return customer;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch('/deactivate/:id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async changeCustomerStatus(@Headers('groups') headers: Array<string>, @Param('id') id: string) {
    try {
      return await this.customersService.changeCustomerStatus(id, false, headers);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch('/reactivate/:id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async reactivateCustomer(@Headers('groups') headers: Array<string>, @Param('id') id: string) {
    try {
      return await this.customersService.changeCustomerStatus(id, true, headers);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
