/* eslint-disable no-useless-escape */
import { UPDATE_PROFILE_TAGS_QUEUE } from '@/config/bull/bull';
import { redisConfig } from '@/config/redis';
import { Configurations } from '@/modules/common/configurations/entities/configurations.entity';
import { Tag } from '@/modules/common/tags/entities';
import { Experience } from '@/modules/professional-profiles/experiences/entities';
import { Job, Worker } from 'bullmq';
import { getRepository } from 'typeorm';
import { Profile } from '../../entities';
import * as leveshtein from 'fast-levenshtein';
import { ProfilesTags } from '../../profiles-tags/entities/profiles-tags.entity';

async function workerProcessFunction(job: Job) {
  function comparisionPercentage(word: string, tag_name: string) {
    word = word
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    tag_name = tag_name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const distance = leveshtein.get(word, tag_name);
    const distancePercentage = distance * 100;
    const matchPercentage = 100 - distancePercentage / tag_name.length;
    return matchPercentage;
  }
  const tagsRepository = getRepository(Tag);
  const configurationsRepository = getRepository(Configurations);
  const profileRepository = getRepository(Profile);
  const experienceRepository = getRepository(Experience);
  const profileTagsRepository = getRepository(ProfilesTags);
  const tagsArray = await await tagsRepository.find();
  const match_percentage = await Number(
    (
      await configurationsRepository.findOne({
        where: { configuration_name: 'match_percentage' }
      })
    ).configuration
  );
  const profile = await profileRepository.findOne({
    where: {
      id: job.data.profileId
    }
  });
  const experiencesArray = await experienceRepository.find({
    where: {
      profile_id: job.data.profileId
    }
  });
  if (profile) {
    for await (const tag of tagsArray) {
      let arrayOfWords: Array<string>;
      if (profile) {
        if (profile.professional_about) {
          arrayOfWords =
            profile.professional_about.split(/\s+|\;+|\.+|\-+|\,+/g);
        }
        if (profile.professional_title) {
          arrayOfWords = arrayOfWords.concat(
            profile.professional_title.split(/\s+|\;+|\.+|\-+|\,+/g)
          );
        }
      }
      for await (const word of arrayOfWords) {
        const percentage = comparisionPercentage(word, tag.name);
        if (percentage >= match_percentage) {
          const profileTag = await profileTagsRepository.findOne({
            where: {
              profile_id: profile.id,
              tag_id: tag.id
            }
          });
          if (!profileTag) {
            const profileTag = await profileTagsRepository.create({
              tag_id: tag.id,
              profile_id: job.data.profileId
            });
            await profileTagsRepository.save(profileTag);
          }
        }
      }
      if (experiencesArray.length > 0) {
        for await (const experience of experiencesArray) {
          if (experience.description) {
            arrayOfWords = experience.description.split(/\s+|\;+|\.+|\-+|\,+/g);
            for await (const word of arrayOfWords) {
              const percentage = comparisionPercentage(word, tag.name);
              if (percentage >= match_percentage) {
                const profileTag = await profileTagsRepository.findOne({
                  where: {
                    profile_id:
                      profile != undefined ? profile.id : experience.profile_id,
                    tag_id: tag.id
                  }
                });
                if (!profileTag) {
                  const profileTag = await profileTagsRepository.create({
                    tag_id: tag.id,
                    profile_id: job.data.profileId
                  });
                  await profileTagsRepository.save(profileTag);
                }
              }
            }
          }
        }
      }
    }
  }
}

new Worker(UPDATE_PROFILE_TAGS_QUEUE, workerProcessFunction, {
  connection: redisConfig.redis,
  concurrency: 1
});
