import { Injectable } from '@nestjs/common';
import { ColumnsRepository } from '../repositories';

@Injectable()
export class DeleteColumnService {
  constructor(private readonly columnsRepository: ColumnsRepository) { }

  async delete(id: string) {
    return await this.columnsRepository.deleteById(id);
  }
}
