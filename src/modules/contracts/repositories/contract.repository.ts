import { EntityRepository, Repository } from 'typeorm';
import { Contract } from '../entities/contract.entity';

interface CreateContractDTO {
  expiration_date: Date;
  customer_id: string;
  name: string;
  observations: string;
  url: string;
}

@EntityRepository(Contract)
export class ContractRepository extends Repository<Contract> {
  public async deleteById(id: string): Promise<void> {
    await this.delete(id);
  }

  async createContract(data: CreateContractDTO) {
    const contract = this.create(data);
    return await this.save(contract);
  }
}
