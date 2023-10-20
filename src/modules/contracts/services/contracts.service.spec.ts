import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from '../../common/shared/services';
import { ContractsService } from './contracts.service';
import { ContractRepository } from '../repositories/contract.repository';
import { MockContractRepository } from '../mocks/repositories/contract.repository.mock';
import { mockCreateContractDTO } from '../mocks/dto/create-contract.dto.mock';
import { mockMulterFile } from '../mocks/dto/file.mock';
import { mockContractModel } from '../mocks/models/contract.model.mock';
import { mockUploadResponse } from '../mocks/dto/s3-upload-response.mock';
import { datatype } from 'faker';

describe('ContractsService', () => {
  let service: ContractsService;
  let contractRepository: any
  let uploadService: UploadService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractsService,
        UploadService,
        { provide: ContractRepository, useFactory: MockContractRepository },
      ],
    }).compile();

    uploadService = module.get<UploadService>(UploadService)
    contractRepository = module.get<ContractRepository>(ContractRepository)
    service = module.get<ContractsService>(ContractsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contract.', async () => {
    // const createContractDTO = mockCreateContractDTO()
    // const multerFile = mockMulterFile()
    // const contract = [mockContractModel()]
    // const uploadResponse = mockUploadResponse()
    // uploadService.uploadFile = jest.fn().mockResolvedValue(uploadResponse)
    // contractRepository.createContract = jest.fn().mockResolvedValue(contract)
    // const result = await service.createContract([multerFile, multerFile], createContractDTO)
    // expect(result).toEqual([contract, contract])
  })

  it("should delete a contract by it's id.", async () => {
    const id = datatype.string()
    contractRepository.deleteById = jest.fn().mockResolvedValue({
      "raw": [],
      "affected": 1
    })
    const result = await service.deleteContractById(id)
    expect(result).toEqual({
      "raw": [],
      "affected": 1
    })
  })
});
