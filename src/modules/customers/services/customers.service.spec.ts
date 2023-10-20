/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { random } from 'faker';
import { RequestContext } from '../../common/auth/middlewares';
import { AccessProfiles } from '../../common/shared/constants/access-profiles';
import { UploadService } from '../../common/shared/services';
import { ContractsService } from '../../contracts/services/contracts.service';
import { ContractRepository } from '../../contracts/repositories/contract.repository';
import { MockContractRepository } from '../../contracts/mocks/repositories/contract.repository.mock';
import { FunnelRepository } from '../../funnel/repositories/funnel.repository';
import { mockAttachmentsRepository } from '../../professional-profiles/attachments/mocks';
import { AttachmentsRepository } from '../../professional-profiles/attachments/repositories';
import { User } from '../../users/entities/user.entity';
import { mockUserRepository } from '../../users/mocks/repositories/user-repository.mock';
import { UserRepository } from '../../users/repositories/user.repository';
import { ContactRepository } from '../contact/repositories/contact.repository';
import { CustomersService } from './customers.service';
import { LogoRepository } from '../logo/repositories/logo.repository';
import { CustomerRepository } from '../repositories/customer.repository';
import {
  mockCreateCustomerDto,
  mockCustomerRepository,
  mockFunnelRepository,
  mockLogoRepository
} from '../mocks';
import { mockContactRepository } from '../mocks/repositories/contact.repository.mock';

describe('CustomersService', () => {
  let service: CustomersService;
  let customerRepository: any;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContractsService,
        CustomersService,
        UploadService,
        { provide: ContactRepository, useFactory: mockContactRepository },
        { provide: CustomerRepository, useFactory: mockCustomerRepository },
        { provide: FunnelRepository, useFactory: mockFunnelRepository },
        { provide: LogoRepository, useFactory: mockLogoRepository },
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: ContractRepository, useFactory: MockContractRepository },
        {
          provide: AttachmentsRepository,
          useFactory: mockAttachmentsRepository
        }
      ]
    }).compile();
    RequestContext.currentUser = jest.fn().mockResolvedValue({
      name: 'test',
      middle_name: 'test',
      email: 'test@test.com',
      id: 'test',
      ip: 'test'
    });
    service = module.get<CustomersService>(CustomersService);
    module.get<ContractsService>(ContractsService);
    customerRepository = module.get<CustomerRepository>(CustomerRepository);
    userRepository = module.get<UserRepository>(UserRepository);

    userRepository.findOne = jest.fn().mockResolvedValue({
      name: 'test',
      middle_name: 'test',
      email: 'test@test.com',
      access_profile: AccessProfiles.ADMINISTRATOR,
      id: random.alpha()
    } as User);
  });

  it('Create customer', async () => {
    const customer = mockCreateCustomerDto();
    customerRepository.createCustomer.mockResolvedValue(customer);
    const changeCustomer = await service.create(customer, null);
    expect(changeCustomer).toBeTruthy();
  });

  it('List customers', async () => {
    const customer = mockCreateCustomerDto();
    customerRepository.listCustomersByQuery.mockResolvedValue([customer]);
    const changeCustomer = await service.findAll({});
    expect(changeCustomer).toBeTruthy();
  });

  it('Deactivate existing customer', async () => {
    const customer = mockCreateCustomerDto();
    customerRepository.findOne.mockResolvedValue(customer);
    const changeCustomer = service.changeCustomerStatus('1', false, [
      'Administrador'
    ]);
    expect(changeCustomer).toBeTruthy();
  });

  it('Reactivate existing customer', () => {
    const changeCustomer = service.changeCustomerStatus('1', true, [
      'Administrador'
    ]);
    expect(changeCustomer).toBeTruthy();
  });
});
