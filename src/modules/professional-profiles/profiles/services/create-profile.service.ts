import { RequestContext } from '@/modules/common/auth/middlewares';
import { Service } from '@/modules/common/shared/core/service';
import { UploadService } from '@/modules/common/shared/services';
import { TagsRepository, TagsToProfilesRepository } from '@/modules/common/tags/repositories';
import { TagUpdateService } from '@/modules/common/tags/tag-update/services/tag-update.service';
import { AttachmentsRepository } from '@/modules/professional-profiles/attachments/repositories';
import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories';
import { FormationsRepository } from '@/modules/professional-profiles/formations/repositories';
import { LanguageRepository } from '@/modules/professional-profiles/languages/repositories';
import { ObservationsRepository } from '@/modules/professional-profiles/observations/repositories';
import { OfficesRepository } from '@/modules/professional-profiles/offices/repositories';
import { CreateProfileDTO } from '@/modules/professional-profiles/profiles/dtos';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import { ReferencesRepository } from '@/modules/professional-profiles/references/repositories';
import { SocialMediasRepository } from '@/modules/professional-profiles/social-medias/repositories';
import { User } from '@/modules/users/entities/user.entity';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { VacancyRepository } from '@/modules/vacancies/repositories/vacancy.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { AddressRepository } from '../../address/repositories/address.repository';
import { handleConvertDurationToDate } from '../../offices/helpers';
import { GenerateService } from './generate.service';
import { ImportsService } from '@/modules/imports/services/imports.service';

export interface FileRequest {
  files?: Express.Multer.File[];
  photo?: Express.Multer.File[];
  quati_result?: Express.Multer.File[];
  disc2_result?: Express.Multer.File[];
}

interface CreateProfileRequest extends CreateProfileDTO {
  creator_id?: string;
  files: FileRequest;
}

@Injectable()
export class CreateProfileService
  implements Service<CreateProfileRequest, Profile>
{
  constructor(
    private readonly attachmentsRepository: AttachmentsRepository,
    private readonly experiencesRepository: ExperiencesRepository,
    private readonly formationsRepository: FormationsRepository,
    private readonly generateService: GenerateService,
    private readonly languagesRepository: LanguageRepository,
    private readonly observationsRepository: ObservationsRepository,
    private readonly officesRepositroy: OfficesRepository,
    private readonly profilesRepository: ProfilesRepository,
    private readonly referencesRepository: ReferencesRepository,
    private readonly socialMediasRepository: SocialMediasRepository,
    private readonly tagsRepository: TagsRepository,
    private readonly tagsToProfileRepository: TagsToProfilesRepository,
    private readonly updateProfileTagsService: TagUpdateService,
    private readonly uploadService: UploadService,
    private readonly userRepository: UserRepository,
    private readonly viewVacancyRepository: VacancyRepository,
    private readonly addressRepository: AddressRepository,
    private readonly importsService: ImportsService
  ) { }
  // Criação de um perfil
  public async execute({
    files,
    ...data
  }: CreateProfileRequest): Promise<Profile> {
    let tags = [];
    let attachments = [];
    let experiences = [];
    let formations = [];
    let references = [];
    let languages = [];
    let social_medias = [];
    let observations = [];
    let user: User = null;

    if (RequestContext.currentUser()) {
      const { name, middle_name, email, id } = RequestContext.currentUser();
      const sender_name = `${name} ${middle_name}`
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      data.created_by = sender_name;

      user = await this.userRepository.findOne({
        where: {
          email
        }
      });

      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      data.username_id = user.id;
    }

    // Verifica se e-mail inserido já existe
    const existingEmail = await this.profilesRepository.findProfileByEmail(
      data.email
    );
    if (existingEmail) {
      throw new ConflictException('Email já existente');
    }

    // Verifica se a combinação de nome e dt nasc inserido já existe
    const existingProfile =
      await this.profilesRepository.findProfileByNameAndCpf(
        data.name,
        data.birthdate
      );
    if (existingProfile) {
      throw new ConflictException('Perfil já existente');
    }

    const uploadedDesc2File = files?.disc2_result
      ? await this.uploadService.uploadFile(files?.disc2_result[0])
      : null;
    const uploadedQuatiFile = files?.quati_result
      ? await this.uploadService.uploadFile(files?.quati_result[0])
      : null;
    const disc2 = files?.disc2_result ? uploadedDesc2File.Location : null;
    const quati = files?.quati_result ? uploadedQuatiFile.Location : null;

    let address_id
    if (data.state && data.city) {
      const address = await this.addressRepository.findOne({
        where: {
          city: data.city,
          state: data.state
        }
      })
      if (!address) {
        const new_address = await this.addressRepository.create({
          city: data.city,
          state: data.state
        })
        address_id = await (await this.addressRepository.save(new_address)).id
      }
      else if (address) {
        address_id = address.id
      }

    }
    Object.assign(data, { "address_id": address_id })
    const createdProfile = await this.profilesRepository.createProfile({
      ...data,
      disc2_result: disc2,
      quati_result: quati
    });

    if (files?.files) {
      const uploadedFiles = files.files?.map(async (file) => {
        const uploadedFile = await this.uploadService.uploadFile(
          file,
          createdProfile.id
        );
        return {
          name: file.originalname,
          url: uploadedFile.Location,
          profile_id: createdProfile.id
        };
      });
      const data_attachments = await Promise.all(uploadedFiles);
      attachments = await this.attachmentsRepository.createAttachmentsInBulk(
        data_attachments
      );
    }
    if (data.tag_ids) {
      const tagsProfile = await this.tagsRepository.findTagsByIds(
        data.tag_ids.map((item) => item.tag_id)
      );
      const tags_profile = [];
      tagsProfile?.forEach((tag) => {
        const experience_time = data.tag_ids.filter(
          (item) => tag.id === item.tag_id
        )[0]?.experience_time;
        tags_profile.push({
          tag,
          experience_time,
          profile: createdProfile
        });
      });
      tags = await this.tagsToProfileRepository.createTagsToProfilesInBulk(
        tags_profile
      );
    }
    if (data.experiences) {
      const experiencesFormatted = data.experiences?.map((experience) => ({
        ...experience,

        profile_id: createdProfile.id
      }));
      experiences = await this.experiencesRepository.createExperiencesInBulk(
        experiencesFormatted
      );

      if (experiences) {
        for (const experience of experiences) {
          const officesPromise = experience.offices?.map(async (office) => {
            const dates = await handleConvertDurationToDate(office.duration);
            return {
              ...office,
              initial_date: office.initial_date || dates.initial_date,
              end_date: office.end_date || dates.end_date,
              experience_id: experience.id
            };
          });
          if (officesPromise) {
            const officesFormatted = await Promise.all(officesPromise);
            await this.officesRepositroy.createOfficesInBulk(officesFormatted);
          }
        }
      }
    }

    if (data?.formations) {
      const formationsFormatted = data.formations?.map((formation) => ({
        ...formation,
        profile_id: createdProfile.id
      }));
      formations = await this.formationsRepository.createFormationsInBulk(
        formationsFormatted
      );
    }
    if (data.languages) {
      const languagesFormatted = data.languages?.map((language) => ({
        ...language,
        profile_id: createdProfile.id
      }));
      languages = await this.languagesRepository.createLanguagesInBulk(
        languagesFormatted
      );
    }
    if (data.references) {
      const referencesFormatted = data.references?.map((reference) => ({
        ...reference,
        profile_id: createdProfile.id
      }));
      references = await this.referencesRepository.createReferencesInBulk(
        referencesFormatted
      );
    }
    if (data.social_medias) {
      const socialMediasFormatted = data.social_medias?.map((socialMedia) => ({
        ...socialMedia,
        profile_id: createdProfile.id
      }));
      social_medias =
        await this.socialMediasRepository.createSocialMediasInBulk(
          socialMediasFormatted
        );
    }
    if (data.observations) {
      // adiciona o candidato a primeira coluna do funil da vaga se o funil existir
      if (data.observations?.length) {
        const observationsFormatted = data.observations?.map(
          async (observation) => {
            if (observation.identify && !observation.vacancy_id) {
              const vacancy = await this.viewVacancyRepository.findOne({
                where: {
                  identify: observation.identify
                }
              });
              if (vacancy) {
                observation.vacancy_id = String(vacancy.id);
              }
            }
            return {
              ...observation,
              profile_id: createdProfile.id
            };
          }
        );

        const data_observations = await Promise.all(observationsFormatted);
        observations =
          await this.observationsRepository.createObservationsInBulk(
            data_observations
          );
      }
    }

    const identify = await this.generateService.numberWizard(createdProfile.id);

    await this.updateProfileTagsService.updateProfessionalTags({
      profileId: createdProfile.id
    });

    await this.importsService.updateProfile(createdProfile, social_medias)

    if (files?.photo?.length > 0) {
      const uploadPhoto = await this.uploadService.uploadFile(
        files?.photo[0],
        createdProfile.id
      );
      await this.profilesRepository.updateProfilePhoto(
        createdProfile.id,
        uploadPhoto.Location
      );
    }

    return {
      ...createdProfile,
      identify,
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
}
