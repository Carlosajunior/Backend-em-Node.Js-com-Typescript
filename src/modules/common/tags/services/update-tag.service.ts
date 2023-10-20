import { RequestContext } from '@/modules/common/auth/middlewares';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { UpdateTagDTO } from '../dtos/update-tag.dto';
import { TagsRepository, TagsToProfilesRepository } from '../repositories';
import * as leveshtein from 'fast-levenshtein'
import { ConfigurationsRepository } from '../../configurations/repositories/configurations.repository';

@Injectable()
export class UpdateTagService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tagsRepository: TagsRepository,
    private readonly tagsToProfile: TagsToProfilesRepository,
    private readonly configurationsRepository: ConfigurationsRepository
  ) { }

  async changeTagsSpotlight(id: string) {
    const toUpdate = await this.tagsToProfile.findOne({ id });
    const changeStatus = await this.tagsToProfile.update(id, {
      spotlight: !toUpdate?.spotlight
    });
    if (changeStatus.affected !== 1) {
      throw new NotFoundException('Update failed, profile tag not found.');
    } else {
      return { ...toUpdate, spotlight: !toUpdate?.spotlight };
    }
  }

  async changeTagsToAproveStatus(id: string) {
    const approved_by = RequestContext.currentUserFormatted();

    const toUpdate = await this.tagsToProfile.findOne({ id });

    const user = await this.userRepository.findOne({
      where: {
        email: RequestContext.currentUser().email
      }
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    const changeStatus = await this.tagsRepository.update(id, {
      to_approve: false,
      approved_by,
      approver_id: user.id
    });

    if (changeStatus.affected !== 1) {
      throw new NotFoundException('Update failed, tag not found.');
    } else {
      return { ...toUpdate, to_approve: false, approved_by, approver: user };
    }
  }

  async updateTag(id: string, data: UpdateTagDTO) {
    try {
      if (data.name) {
        const tagsNamesArray = await (await this.tagsRepository.find()).map((tag) => tag.name)
        const match_percentage = await Number((await this.configurationsRepository.findOne({ where: { configuration_name: "match_percentage" } })).configuration)
        for await (let tag_name of tagsNamesArray) {
          let percentage = this.comparisionPercentage(data.name, tag_name)
          if (percentage >= match_percentage) {
            throw new NotAcceptableException('Tag is similar to another one that already exists.')
          }
        }
      }
      return this.tagsRepository.updateTag(id, data);
    } catch (error) {
      return new NotFoundException(error);
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
