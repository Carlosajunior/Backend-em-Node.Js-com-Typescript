import { Injectable } from '@nestjs/common';
import { CreateColumnDTO } from '../dtos';
import { Columns } from '../entities';
import { ColumnsRepository } from '../repositories';

@Injectable()
export class CreateColumnService {
  constructor(private readonly columnsRepository: ColumnsRepository) { }

  async create(data: CreateColumnDTO): Promise<Columns> {
    return this.columnsRepository.createTag(data);
  }
}
