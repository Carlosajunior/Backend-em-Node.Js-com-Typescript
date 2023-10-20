import { elasticsearchService } from '@/config/elasticseach';
import { ElasticSearchIndex } from '@/modules/common/elastic/constants';
import { TagCategories } from '@/modules/common/tags/constants/tag-categories.constants';
import { TagsToProfile } from '@/modules/common/tags/entities';
import {
  TagsRepository,
  TagsToProfilesRepository
} from '@/modules/common/tags/repositories';
import { ImportsEnum } from '@/modules/logs-imports/constants/import.constants';
import { LogsImportsRepository } from '@/modules/logs-imports/repositories/logs-imports.repository';
import { Experience } from '@/modules/professional-profiles/experiences/entities';
import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories';
import { Formation } from '@/modules/professional-profiles/formations/entities';
import { FormationsRepository } from '@/modules/professional-profiles/formations/repositories';
import { handleConvertDurationToDate } from '@/modules/professional-profiles/offices/helpers';
import { OfficesRepository } from '@/modules/professional-profiles/offices/repositories';
import { BooleanStatus } from '@/modules/professional-profiles/profiles/contansts';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { ProfilesTagsRepository } from '@/modules/professional-profiles/profiles/profiles-tags/repositories/profiles-tags.repository';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import { SocialMedia } from '@/modules/professional-profiles/social-medias/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { FindManyOptions, ILike, IsNull, Raw } from 'typeorm';
import { ProfileModel, TagModel } from '../models/linkedin-profile.model';
import { TransfromService } from './transform-service.service';

@Injectable()
export class ImportsService {
  constructor(
    private readonly logsImportsRepository: LogsImportsRepository,
    private readonly tagRepository: TagsRepository,
    private readonly tagsToProfilesRepository: TagsToProfilesRepository,
    private readonly profileTagsRepository: ProfilesTagsRepository,
    private readonly experienceRepository: ExperiencesRepository,
    private readonly officeRepository: OfficesRepository,
    private readonly formationsRepository: FormationsRepository,
    private readonly profilesRepository: ProfilesRepository,
    private readonly transfromService: TransfromService
  ) { }

  async updateProfile(profile: Profile, social_medias: SocialMedia[]) {
    try {
      const url = social_medias.find((social_media) =>
        social_media.link.includes('linkedin')
      ).link;
      if (url) {
        const log = await this.logsImportsRepository.createLogImport({
          link_linkedin: url,
          status: ImportsEnum.pending
        });
        const body = {
          link: url,
          callbackUrl: `${process.env.API_URL}/imports?logImportId=${log.id}&profileId=${profile.id}`
        };
        axios.post(
          'http://queue.scrapper.uds.com.br:8000/v1/queue/scrapper/linkedin',
          body
        );
      }
    } catch (error) {
      return error;
    }
  }

  async updateProfileByImport(
    data: any,
    logImportId: string,
    profileId: string
  ) {
    let tags: TagsToProfile[] = [];
    let experiences: Experience[] = [];
    let formations: Formation[] = [];
    try {
      if (data.name == '') {
        return await this.logsImportsRepository.update(
          { id: logImportId },
          { status: ImportsEnum.error }
        );
      }

      const mappedProfile = await this.transfromService.transformDataTypeOne(data);

      await this.logsImportsRepository.update(
        { id: logImportId },
        { status: ImportsEnum.success }
      );
      const currentProfile = await this.profilesRepository.findProfileById(
        profileId
      );
      const currentExperiences =
        await this.experienceRepository.listExperiencesByProfile(profileId);
      const currentFormations =
        await this.formationsRepository.listFormationsByProfile(profileId);
      const profileData: ProfileModel = {} as ProfileModel & { id: string };
      Object.entries(mappedProfile).forEach((field) => {
        if (field[1] && !Array.isArray(field[1])) {
          if (!currentProfile[field[0]]) {
            Object.assign(profileData, { [field[0]]: field[1] });
          }
        }
        if (Array.isArray(field[1])) {
          if (field[1] && field[1].length) {
            if (field[0] == 'experiences' && !currentExperiences.length) {
              Object.assign(profileData, { [field[0]]: field[1] });
            } else if (field[0] == 'formations' && !currentFormations.length) {
              Object.assign(profileData, { [field[0]]: field[1] });
            } else if (field[0] == 'tag_names') {
              Object.assign(profileData, { [field[0]]: field[1] });
            }
          }
        }
      });

      if (mappedProfile.professional_title) {
        Object.assign(profileData, {
          professional_title: mappedProfile.professional_title
        });
      }


      if (Array.isArray(profileData.tag_names)) {
        const tags_profile: TagsToProfile[] = [];
        const tagsProfile = await this.tagRepository.findTagsByNames(
          profileData.tag_names
        );

        const LinkedinTags = profileData.tag_names.filter(
          (tagName) =>
            !tagsProfile.some(
              (tag) =>
                tag.name.toLocaleLowerCase() === tagName.toLocaleLowerCase()
            )
        );

        for (const tag of LinkedinTags) {
          try {
            const created = await this.tagRepository.createTag({
              name: tag,
              category: TagCategories.outros,
              to_approve: false
            });
            tagsProfile.push(created);
          } catch (error) { }
        }

        for (const tag of tagsProfile) {
          tags_profile.push({
            spotlight: false,
            tag: tag as TagModel,
            profile_id: profileId,
            experience_time: profileData.tags?.find(
              (t: any) => t.name === tag.name
            )?.experience_time
          } as TagsToProfile);
        }
        tags =
          await this.tagsToProfilesRepository.insertOrDeleteTagsToProfilesInBulk(
            tags_profile,
            profileId
          );
        Object.assign(profileData, { tags });
      }

      Object.assign(profileData, { id: profileId });

      if (Array.isArray(profileData.experiences)) {
        experiences = await this.experienceRepository.createExperiencesInBulk(
          profileData.experiences.map(
            (experience) =>
            ({
              ...experience,
              profile_id: profileId
            } as Experience)
          )
        );
        if (experiences) {
          for (const experience of experiences) {
            const officesPromise = experience.offices?.map(async (office) => {
              office.duration = office.duration ? office.duration : '';
              const dates = await handleConvertDurationToDate(office.duration);
              return {
                ...office,
                initial_date: office.initial_date || dates?.initial_date,
                end_date: office.end_date || dates?.end_date || '',
                experience_id: experience.id
              };
            });
            const offices = await Promise.all(officesPromise);
            experience.offices =
              await this.officeRepository.createOfficesInBulk(offices);
          }
        }

        Object.assign(profileData, { experiences });
      }

      if (Array.isArray(profileData.formations)) {
        formations = await this.formationsRepository.createFormationsInBulk(
          profileData.formations.map((formation) => ({
            ...formation,
            profile_id: profileId
          }))
        );
        Object.assign(profileData, { formations });
      }
      const profile = {};
      Object.entries(profileData).forEach((field) => {
        if (field[1] && !Array.isArray(field[1])) {
          Object.assign(profile, { [field[0]]: field[1] });
        }
      });
      await this.profilesRepository.update({ id: profileId }, profile);
      const full_profile_data: any = {
        ...profile
      };
      if (tags.length) full_profile_data.tags = tags;
      if (experiences.length) full_profile_data.experiences = experiences;
      if (formations.length) full_profile_data.formations = formations;
      await elasticsearchService.update({
        index: ElasticSearchIndex.profile,
        retry_on_conflict: 1,
        id: profileId,
        doc: full_profile_data,
        upsert: full_profile_data
      });
    } catch (error) {
      return error;
    }
  }

  async updateProfileWihtImport(data: ProfileModel, profile_id: string) {
    try {
      const profile = await this.profilesRepository.findOne({
        where: { id: profile_id }
      });

      if (Array.isArray(data.tag_names)) {
        for await (const name of data.tag_names) {
          const tag = await this.tagRepository.findOne({
            where: { name: name }
          });
          if (tag) {
            const profileTag = await this.profileTagsRepository.findOne({
              where: {
                profile_id: profile_id,
                tag_id: tag.id
              }
            });
            if (!profileTag) {
              const profile_tag = await this.profileTagsRepository.create({
                spotlight: false,
                profile_id: profile_id,
                tag_id: tag.id
              });
              await this.profileTagsRepository.save(profile_tag);
            }
          }
        }
      }

      if (Array.isArray(data.experiences)) {
        for await (const experience of data.experiences) {
          const exists = await this.experienceRepository.findOne({
            where: {
              profile_id: profile_id,
              company: experience.company,
              position: experience.position
            }
          });
          if (!exists) {
            const experienceObject = await this.experienceRepository.create({
              company: experience.company,
              position: experience.position,
              initial_date: experience.initial_date,
              end_date: experience.end_date,
              current_position: experience.current_position,
              profile_id: profile_id
            });
            await this.experienceRepository.save(experienceObject);
            if (Array.isArray(experience.offices)) {
              for await (const office of experience.offices) {
                const officeObject = await this.officeRepository.create({
                  description: office.description,
                  name: office.name,
                  location: office.location,
                  duration: office.duration,
                  current_position: office.current_position,
                  end_date: office.end_date,
                  initial_date: office.initial_date,
                  experience_id: experienceObject.id
                });
                await this.officeRepository.save(officeObject);
              }
            }
          }
        }
      }

      if (Array.isArray(data.formations)) {
        for await (const formation of data.formations) {
          const exists = await this.formationsRepository.findOne({
            where: {
              profile_id: profile_id,
              course: formation.course,
              institution: formation.institution
            }
          });
          if (!exists) {
            const formationObject = await this.formationsRepository.create({
              course: formation.course,
              end_date: formation.end_date,
              initial_date: formation.initial_date,
              institution: formation.institution,
              profile_id: profile_id
            });
            await this.formationsRepository.save(formationObject);
          }
        }
      }
      const dataToUpdate = {};
      if (profile.name == null)
        Object.assign(dataToUpdate, dataToUpdate, data.name);
      if (profile.professional_about == null)
        Object.assign(dataToUpdate, dataToUpdate, data.professional_about);
      if (profile.professional_title == null)
        Object.assign(dataToUpdate, dataToUpdate, data.professional_title);
      if (profile.created_by == null)
        if (profile.city == null)
          // Object.assign(dataToUpdate, dataToUpdate, data.created_by);
          Object.assign(dataToUpdate, dataToUpdate, data.city);
      if (profile.state == null)
        Object.assign(dataToUpdate, dataToUpdate, data.state);
      if (profile.photo_url == null)
        Object.assign(dataToUpdate, dataToUpdate, data.photo_url);
      if (profile.phone == null)
        Object.assign(dataToUpdate, dataToUpdate, data.phone);
      if (profile.email == null)
        Object.assign(dataToUpdate, dataToUpdate, data.email);
      if (profile.open_to_work == null)
        Object.assign(
          dataToUpdate,
          dataToUpdate,
          data.open_to_work ? data.open_to_work : BooleanStatus.False
        );
      await this.profilesRepository.update({ id: profile_id }, data);
    } catch (error) {
      return error;
    }
  }

  public async *processDbData(
    options?: FindManyOptions<Profile>,
    page?: number
  ) {
    options = Object.assign(options, { active: true })
    const [profiles, count] = await this.profilesRepository.findAndCount(
      options,

    );
    yield {
      total: count,
      total_pages: Math.ceil(count / Number(options.take)),
      page: page
    };

    try {
      for (const profile of profiles) {
        const link_linkedin =
          profile.social_medias?.filter((sm) =>
            sm.link.includes('linkedin')
          )?.[0]?.link || '';
        if (link_linkedin) {
          const log = await this.logsImportsRepository.createLogImport({
            link_linkedin,
            status: ImportsEnum.pending
          });
          try {
            await axios.post(
              'http://queue.scrapper.uds.com.br:8000/v1/queue/scrapper/linkedin',
              {
                link: link_linkedin,
                callbackUrl: `${process.env.API_URL}/imports/?logImportId=${log.id}&profileId=${profile.id}`
              }
            );
          } catch (error) {
            throw new BadRequestException(error.message);
          }
        } else {
          // console.log(profile.name + ' não tem linkedin');
        }
        yield profile;
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateExistingInternalProfiles({ page = 1, records_per_page = 10 }) {
    const response = [];
    for await (const data of this.processDbData({
      where: [
        {
          created_by: Raw(
            (alias) =>
              `${alias} NOT ILIKE '%portal de vaga%' AND ${alias} NOT ILIKE '%scrapper%' OR ${alias} IS NULL`
          )
        }
      ],
      take: Number(records_per_page),
      skip: (Number(page) - 1) * Number(records_per_page),
      relations: ['social_medias']
    })) {
      response.push(data);
    }
    if (response[0].total_pages > Number(page)) {
      await this.updateExistingInternalProfiles({
        page: Number(page) + 1,
        records_per_page
      });
    }
    return response[0];
  }

  async updateExistingVancanciesPortalProfiles({
    page = 1,
    records_per_page = 10
  }) {
    const response = [];
    for await (const data of this.processDbData(
      {
        where: [
          { created_by: ILike('%portal de vaga%'), updater_id: IsNull() }
        ],
        take: Number(records_per_page),
        skip: (Number(page) - 1) * Number(records_per_page),
        relations: ['social_medias']
      },
      Number(page)
    )) {
      response.push(data);
    }
    if (response[0].total_pages > Number(page)) {
      await this.updateExistingVancanciesPortalProfiles({
        page: Number(page) + 1,
        records_per_page
      });
    }

    return response[0];
  }
}
