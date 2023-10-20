import { queues } from '@/config/bull/bull';
import { elasticsearchService } from '@/config/elasticseach';
import { ElasticSearchIndex } from '@/modules/common/elastic/constants';
import { UploadService } from '@/modules/common/shared/services';
import { TagsToProfilesRepository } from '@/modules/common/tags/repositories';
import { TagsRepository } from '@/modules/common/tags/repositories/tags.repository';
import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories';
import { FormationsRepository } from '@/modules/professional-profiles/formations/repositories';
import { LanguageRepository } from '@/modules/professional-profiles/languages/repositories';
import { UpdateProfileDTO } from '@/modules/professional-profiles/profiles/dtos';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories/profiles.repository';
import { ReferencesRepository } from '@/modules/professional-profiles/references/repositories';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { AttachmentsRepository } from '../../attachments/repositories/attachments.repository';
import { ObservationsRepository } from '../../observations/repositories/observations.repository';
import { SocialMediasRepository } from '../../social-medias/repositories/social-medias.repository';
import { FileRequest } from './create-profile.service';

@Injectable()
export class UpdateProfileService {
  constructor(
    private readonly profilesRepository: ProfilesRepository,
    private readonly tagsRepository: TagsRepository,
    private readonly tagsToProfileRepository: TagsToProfilesRepository,
    private readonly attachmentsRepository: AttachmentsRepository,
    private readonly experiencesRepository: ExperiencesRepository,
    private readonly formationsRepository: FormationsRepository,
    private readonly languagesRepository: LanguageRepository,
    private readonly referencesRepository: ReferencesRepository,
    private readonly socialMediasRepository: SocialMediasRepository,
    private readonly observationsRepository: ObservationsRepository,
    private readonly viewVacancyRepository: VacancyRepository,
    private readonly uploadService: UploadService
  ) { }

  async update(id: string, data: UpdateProfileDTO, files: FileRequest) {
    const tags_profile = [];
    if (data.tag_ids) {
      const tagsProfile = await this.tagsRepository.findTagsByIds(
        data.tag_ids.map((item) => item.tag_id)
      );
      tagsProfile?.forEach((tag) => {
        const toUpdate = data.tag_ids.filter((item) => tag.id === item.tag_id)[0];
        const id = toUpdate?.id;
        const experience_time = toUpdate?.experience_time;
        const spotlight = toUpdate?.spotlight ? true : false;
        tags_profile.push({
          id,
          experience_time,
          spotlight,
          tag
        });
      });
    }

    let attachments = [];

    if (files?.disc2_result) {
      const uploadedDesc2File = await this.uploadService.uploadFile(
        files?.disc2_result[0]
      );
      Object.assign(data, { "disc2_result": uploadedDesc2File.Location })
    }

    if (files?.quati_result) {
      const uploadedQuatiFile = await this.uploadService.uploadFile(
        files?.quati_result[0]
      );
      Object.assign(data, { "quati_result": uploadedQuatiFile.Location })


    }

    if (data.observations?.length) {
      data.observations.forEach(async (observation) => {
        if (observation.identify && !observation.vacancy_id) {
          const vacancy = await this.viewVacancyRepository.findOne({
            where: {
              identify: observation.identify
            }
          });
          const vacancy_id = vacancy?.id;
          if (vacancy_id) {
            observation.vacancy_id = String(vacancy_id);
          }
        }
      }, []);
    }

    const tags =
      await this.tagsToProfileRepository.insertOrDeleteTagsToProfilesInBulk(
        tags_profile || [],
        id
      );
    const experiences =
      await this.experiencesRepository.insertOrDeleteExperiencesInBulk(
        data.experiences || [],
        id
      );
    const formations =
      await this.formationsRepository.insertOrDeleteFormationsInBulk(
        data.formations || [],
        id
      );
    const references =
      await this.referencesRepository.insertOrDeleteReferencesInBulk(
        data.references || [],
        id
      );
    const languages =
      await this.languagesRepository.insertOrDeleteLanguagesInBulk(
        data.languages || [],
        id
      );
    const social_medias =
      await this.socialMediasRepository.insertOrDeleteSocialMediasInBulk(
        data.social_medias || [],
        id
      );

    const observations =
      await this.observationsRepository.insertOrDeleteObservationsInBulk(
        data.observations || [],
        id
      );

    delete data.tag_ids
    delete data.observations
    delete data.social_medias
    delete data.experiences
    delete data.formations
    delete data.references
    delete data.languages
    delete data.attachments

    await this.profilesRepository.updateProfile(data, id)
    const updatedProfile = await this.profilesRepository.findOne({ where: { id: id } })

    if (files?.files) {
      const uploadedFiles = files.files?.map(async (file) => {
        const uploadedFile = await this.uploadService.uploadFile(file, id);
        return {
          name: file.originalname,
          url: uploadedFile.Location,
          profile_id: id
        };
      });
      const data_attachments = await Promise.all(uploadedFiles);
      attachments = await this.attachmentsRepository.insertAttachmentsInBulk(
        data_attachments || [],
        id
      );
    }

    queues.updateProfileTagsQueue.add(id, {
      profileId: id,
    });

    if (files?.photo?.length > 0) {
      const uploadPhoto = await this.uploadService.uploadFile(
        files?.photo[0],
        id
      );
      await this.profilesRepository.updateProfilePhoto(
        id,
        uploadPhoto.Location
      );
    }

    return {
      ...updatedProfile,
      attachments,
      tags,
      experiences,
      formations,
      references,
      languages,
      social_medias,
      observations
    };
  }

  async update_into_elastic(id: string) {
    const profile = await this.profilesRepository.findProfileById(id);
    if (profile) {
      const tags =
        await this.tagsToProfileRepository.listTagsToProfileByProfile(id);
      const attachments =
        await this.attachmentsRepository.listAttachmentsByProfile(id);
      const experiences =
        await this.experiencesRepository.listExperiencesByProfile(id);
      const formations =
        await this.formationsRepository.listFormationsByProfile(id);
      const languages = await this.languagesRepository.listLanguagesByProfile(
        id
      );
      const observations =
        await this.observationsRepository.listObservationsByProfile(id);
      const references =
        await this.referencesRepository.listReferencesByProfile(id);
      const social_medias =
        await this.socialMediasRepository.listSocialMediasByProfile(id);
      const full_profile_data = {
        ...profile,
        photo_url: profile.photo_url
          ? `${profile.photo_url}?hash=${v4()}`
          : profile.photo_url,
        tags,
        attachments,
        experiences,
        formations,
        languages,
        observations,
        references,
        social_medias
      };
      await elasticsearchService.update({
        index: ElasticSearchIndex.profile,
        id: profile.id,
        retry_on_conflict: 1,
        doc: full_profile_data,
        upsert: full_profile_data
      });
    }
    return profile;
  }

  async get_all_profile_data(id: string) {
    const profile = await this.profilesRepository.findProfileById(id);
    if (profile) {
      const tags =
        await this.tagsToProfileRepository.listTagsToProfileByProfile(id);
      const attachments =
        await this.attachmentsRepository.listAttachmentsByProfile(id);
      const experiences =
        await this.experiencesRepository.listExperiencesByProfile(id);
      const formations =
        await this.formationsRepository.listFormationsByProfile(id);
      const languages = await this.languagesRepository.listLanguagesByProfile(
        id
      );
      const observations =
        await this.observationsRepository.listObservationsByProfile(id);
      const references =
        await this.referencesRepository.listReferencesByProfile(id);
      const social_medias =
        await this.socialMediasRepository.listSocialMediasByProfile(id);
      const full_profile_data = {
        ...profile,
        photo_url: profile.photo_url
          ? `${profile.photo_url}?hash=${v4()}`
          : profile.photo_url,
        tags,
        attachments,
        experiences,
        formations,
        languages,
        observations,
        references,
        social_medias
      };
      return full_profile_data;
    }
  }
}