import { BadRequestException, Injectable } from '@nestjs/common';
import { UploadService } from '../../common/shared/services';
import { CreateContractDTO } from '../dto/create-contract.dto';
import { Contract } from '../entities/contract.entity';
import { ContractRepository } from '../repositories/contract.repository';

interface UploadedContract {
  name: string;
  url: string;
}

@Injectable()
export class ContractsService {
  constructor(
    private readonly uploadService: UploadService,
    private readonly contractRepository: ContractRepository
  ) { }

  async createContract(
    contracts: Express.Multer.File[],
    data: CreateContractDTO
  ) {
    const filteredContacts = contracts?.filter((c, i) => {
      if (!data?.alreadyUploaded) return c;

      if (!data?.alreadyUploaded[i]) return c;
    });

    const filteredObservations = data.observations?.filter((c, i) => {
      if (!data?.alreadyUploaded) return c;

      if (!data?.alreadyUploaded[i]) return c;
    });

    const filteredExpirations = data.expiration_date?.filter((c, i) => {
      if (!data?.alreadyUploaded) return c;

      if (!data?.alreadyUploaded[i]) return c;
    });
    const uploadedContracts: Promise<UploadedContract>[] =
      filteredContacts?.map(async (contract) => {
        const uploadedContract = await this.uploadService.uploadFile(
          contract,
          data.customer_id
        );

        return {
          name: contract.originalname,
          url: uploadedContract.Location
        };
      });
    const contracts_links = await Promise.all(uploadedContracts);
    const createdContracts = await contracts_links?.map(async (contract_link, index) => {
      const contract = await this.contractRepository.createContract({
        expiration_date: filteredExpirations[index],
        customer_id: data.customer_id,
        observations: filteredObservations[index],
        name: contract_link.name,
        url: contract_link.url
      })
      return contract
    });
    const contractsArray = Promise.all(createdContracts)
    return contractsArray
  }

  public async deleteContractById(id: string) {
    try {
      return await this.contractRepository.deleteById(id);
    } catch (e) {
      throw new BadRequestException(
        'Ocorreu um erro ao tentar excluir o arquivo'
      );
    }
  }
}
