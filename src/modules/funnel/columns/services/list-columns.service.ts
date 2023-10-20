import { Injectable } from '@nestjs/common'
import { ListSimpleModel } from '@/modules/common/shared/models'
import { ColumnsRepository } from '../repositories'
import { Columns } from '../entities'
import { ListColumnsDTO } from '../dtos'

@Injectable()
export class ListColumnsService {
  constructor(
    private readonly columnsRepository: ColumnsRepository
  ) { }

  async list({
    id,
    records_limit
  }: ListColumnsDTO): Promise<ListSimpleModel<Columns>> {
    return await this.columnsRepository.findColumnsByFunnel({
      id,
      records_limit
    })
  }
}