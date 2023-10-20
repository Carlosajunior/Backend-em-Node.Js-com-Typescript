import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories';
import { ProfilesTagsRepository } from '@/modules/professional-profiles/profiles/profiles-tags/repositories/profiles-tags.repository';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TagsRepository } from '../../repositories';
import { UpdateTagUpdateDto } from '../dto/update-tag-update.dto';
import * as leveshtein from 'fast-levenshtein'
import { ConfigurationsRepository } from '../../../configurations/repositories/configurations.repository';

@Injectable()
export class TagUpdateService {
  constructor(
    private readonly profileRepository: ProfilesRepository,
    private readonly tagsRepository: TagsRepository,
    private readonly profileTagsRepository: ProfilesTagsRepository,
    private readonly experienceRepository: ExperiencesRepository,
    private readonly configurationsRepository: ConfigurationsRepository
  ) { }

  comparisionPercentage(word: string, tag_name: string) {
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    tag_name = tag_name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    let distance = leveshtein.get(word, tag_name)
    let distancePercentage = distance * 100
    let matchPercentage = 100 - (distancePercentage / tag_name.length)
    return matchPercentage
  }

  async updateProfessionalTags(data: UpdateTagUpdateDto) {
    try {
      const tagsArray = await (await this.tagsRepository.find())
      const match_percentage = await Number((await this.configurationsRepository.findOne({ where: { configuration_name: "match_percentage" } })).configuration)
      const profile = await this.profileRepository.findOne({
        where: {
          id: data.profileId
        }
      })
      const experiencesArray = await this.experienceRepository.find({
        where: {
          profile_id: data.profileId,
        }
      })
      if (profile) {
        for await (let tag of tagsArray) {
          let arrayOfWords: Array<string>
          if (profile) {
            if (profile.professional_about) {
              arrayOfWords = profile.professional_about.split(/\s+|\;+|\.+|\-+|\,+/g)
            }
            if (profile.professional_title) {
              arrayOfWords = arrayOfWords.concat(profile.professional_title.split(/\s+|\;+|\.+|\-+|\,+/g))
            }
          }
          for await (let word of arrayOfWords) {
            let percentage = this.comparisionPercentage(word, tag.name)
            if (percentage >= match_percentage) {
              const profileTag = await this.profileTagsRepository.findOne({
                where: {
                  profile_id: profile.id,
                  tag_id: tag.id
                }
              })
              if (!profileTag) {
                const profileTag = await this.profileTagsRepository.create({
                  tag_id: tag.id,
                  profile_id: data.profileId
                })
                await this.profileTagsRepository.save(profileTag)
              }
            }
          }
          if (experiencesArray.length > 0) {
            for await (let experience of experiencesArray) {
              if (experience.description) {
                arrayOfWords = experience.description.split(/\s+|\;+|\.+|\-+|\,+/g)
                for await (let word of arrayOfWords) {
                  let percentage = this.comparisionPercentage(word, tag.name)
                  if (percentage >= match_percentage) {
                    const profileTag = await this.profileTagsRepository.findOne({
                      where: {
                        profile_id: (profile != undefined ? profile.id : experience.profile_id),
                        tag_id: tag.id
                      }
                    })
                    if (!profileTag) {
                      const profileTag = await this.profileTagsRepository.create({
                        tag_id: tag.id,
                        profile_id: data.profileId
                      })
                      await this.profileTagsRepository.save(profileTag)
                    }
                  }
                }
              }
            }
          }
        }
      }
      else {
        return new NotFoundException()
      }
    } catch (error) {
      return new NotFoundException(error)
    }
  }

  async updateDatabaseProfessionalTags() {
    try {
      const profilesList = await this.profileRepository.find({ where: { active: true } })
      for await (let profile of profilesList) {
        this.updateProfessionalTags({ profileId: profile.id })
      }
    } catch (error) {
      return new NotFoundException(error)
    }
  }
}
