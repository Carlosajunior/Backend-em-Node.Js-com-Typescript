import { createQueryBuilder, EntityRepository, Repository } from 'typeorm'

import { Columns } from '../entities'
import { CreateColumnDTO, ListColumnsDTO } from '../dtos'
import { ListSimpleModel } from '@/modules/common/shared/models'

@EntityRepository(Columns)
export class ColumnsRepository extends Repository<Columns> {
  async countTags(condition?: string): Promise<number> {
    return condition
      ? createQueryBuilder<Columns>('columns')
        .where(condition)
        .getCount()
      : createQueryBuilder<Columns>('columns')
        .getCount()
  }

  async createColumnsInBulk(data: CreateColumnDTO[]): Promise<Columns[]> {
    const promises = data.map(async column => {
      const createdColumn = this.create({
        name: column.name,
        index: column.index,
        postinterview: column.postinterview,
        preinterview: column.preinterview,
        funnelId: column.funnel_id
      })
      const get = await this.save(createdColumn)
      return get
    })
    const columns = Promise.all(promises)
    return columns
  }

  async findColumnsByFunnel(data: ListColumnsDTO): Promise<ListSimpleModel<Columns>> {
    const condition =
      `funnel.id = '${data.id}'`
    const columns = await createQueryBuilder<Columns>('Columns')
      .leftJoin('Columns.funnel', 'funnel')
      .where(condition)
      .take(data.records_limit)
      .orderBy('Columns.index', 'ASC', 'NULLS FIRST')
      .getMany()
    const columnsCount = columns.length
    return {
      results: columns,
      search_limit: data.records_limit,
      total_results: columnsCount
    }
  }

  async findTagsByIds(tagIds: string[]): Promise<Columns[]> {
    const promises = tagIds.map(
      async tagId => await this.findOne(tagId)
    )
    const getTags = await Promise.all(promises)
    return getTags.filter(tag => Boolean(tag))
  }

  async createTag(data: CreateColumnDTO): Promise<Columns> {
    const createdTag = this.create(data)
    return await this.save(createdTag)
  }

  async deleteById(id: string) {
    return await this.delete(id)
  }
}
