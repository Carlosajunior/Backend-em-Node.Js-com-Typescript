import { createQueryBuilder, EntityRepository, ILike, Repository } from 'typeorm'

import { CreateTagDTO, ListTagsDTO } from '@/modules/common/tags/dtos'
import { Tag } from '@/modules/common/tags/entities'
import { ListEntitiesModel } from '@/modules/common/shared/models'
import { UpdateTagDTO } from '../dtos/update-tag.dto'

@EntityRepository(Tag)
export class TagsRepository extends Repository<Tag> {
  async countTags(condition?: string): Promise<number> {
    return condition
      ? createQueryBuilder<Tag>('tag')
        .where(condition)
        .getCount()
      : createQueryBuilder<Tag>('tag')
        .getCount()
  }

  async findTags(query: ListTagsDTO | undefined): Promise<ListEntitiesModel<Tag>> {
    const { page, records_per_page: recordsPerPage, search, category, to_approve } = query
    let condition = `unaccent(name) ilike '${search}%'`
    if (category) condition = `${condition} and category = '${category}'`

    const tags = await createQueryBuilder<Tag>('tag')
      .where(condition)
      .andWhere("to_approve = :id", { id: to_approve })
      .take(recordsPerPage)
      .skip((page - 1) * recordsPerPage)
      .orderBy('name')
      .getManyAndCount()

    const tagsCount = tags[1]
    return {
      page,
      results: tags[0],
      total_results_per_page: tags[0].length,
      total_results: tagsCount,
      total_pages: Math.ceil(tagsCount / recordsPerPage)
    }
  }

  async findTagByName(name: string): Promise<Tag> {
    return await this.findOne({
      where: {
        name: ILike(name)
      }
    })
  }

  async findTagsByIds(tagIds: string[]): Promise<Tag[]> {
    const promises = tagIds.map(
      async tagId => await this.findOne(tagId)
    )
    const getTags = await Promise.all(promises)
    return getTags.filter(tag => Boolean(tag))
  }

  async findTagsByNames(tagNames: string[]): Promise<(Tag | null)[]> {
    const promises = tagNames.map(
      async (name) =>
        this.createQueryBuilder("Tag")
          .where("Tag.name ilike :name", {
            name: `%${name}%`,
          })
          .getOne()
    );
    const getTags = await Promise.all(promises);
    return getTags.filter((tag) => Boolean(tag));
  }

  async createTag(data: CreateTagDTO): Promise<Tag> {
    data.name = data.name.toUpperCase()
    const createdTag = this.create(data)
    return await this.save(createdTag)
  }

  async updateTag(id: string, data: UpdateTagDTO) {
    data.name = data.name.toUpperCase()
    return await this.update({ id: id }, data)
  }
}
