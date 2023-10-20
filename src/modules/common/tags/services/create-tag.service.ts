import { Injectable, BadRequestException, NotAcceptableException } from '@nestjs/common'
import { CreateTagDTO } from '@/modules/common/tags/dtos'
import { Tag } from '@/modules/common/tags/entities'
import { TagsRepository } from '@/modules/common/tags/repositories'
import * as leveshtein from 'fast-levenshtein'
import { ConfigurationsRepository } from '../../configurations/repositories/configurations.repository'

@Injectable()
export class CreateTagService {
  constructor(
    private readonly tagsRepository: TagsRepository,
    private readonly configurationsRepository: ConfigurationsRepository
  ) { }

  async create(data: CreateTagDTO): Promise<Tag> {
    try {
      const findTagByName = await this.tagsRepository.findTagByName(data.name)
      if (findTagByName) {
        throw new BadRequestException('Tag already exists')
      }
      const tagsNamesArray = await (await this.tagsRepository.find()).map((tag) => tag.name)
      const match_percentage = await Number((await this.configurationsRepository.findOne({ where: { configuration_name: "match_percentage" } })).configuration)
      for await (let tag_name of tagsNamesArray) {
        let percentage = this.comparisionPercentage(data.name, tag_name)
        if (percentage >= match_percentage) {
          throw new NotAcceptableException('Tag is similar to another one that already exists.')
        }
      }
      return await this.tagsRepository.createTag(data)
    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }

  comparisionPercentage(word: string, tag_name: string) {
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    tag_name = tag_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    let distance = leveshtein.get(word, tag_name)
    let distancePercentage = distance * 100
    let matchPercentage = 100 - (distancePercentage / tag_name.length)
    return matchPercentage
  }
}
