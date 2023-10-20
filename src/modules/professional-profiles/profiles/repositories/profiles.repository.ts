import { EntityRepository, getManager, ILike, Repository } from 'typeorm';

import {
  CreateProfileDTO,
  UpdateProfileDTO
} from '@/modules/professional-profiles/profiles/dtos';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { NotFoundException } from '@nestjs/common';
import { ProfileBehavioralProfile } from '../contansts';
import { ProfileOrigin } from '../contansts/profile-origin.constant';

@EntityRepository(Profile)
export class ProfilesRepository extends Repository<Profile> {
  public async createProfile(data: CreateProfileDTO): Promise<Profile> {
    const profile = this.create(data);

    const savedProfile = await this.save(profile, {
      transaction: true
    });

    return savedProfile;
  }

  async deleteBehavioralProfileFieldInfo(
    fieldname: ProfileBehavioralProfile,
    id: string
  ) {
    const profile = await this.update(id, { [fieldname]: null });
    if (profile.affected !== 1) {
      throw new NotFoundException('Update failed, profile not found.');
    } else {
      const updatedProfile = await this.findOne(id);
      const profile = await this.save(updatedProfile);
      return profile;
    }
  }

  async findProfileById(id: string): Promise<Profile> {
    const profiles = await getManager().query(
      `
    SELECT
      active,
      accept_contract,
      alocated_by,
      birthdate,
      category_id,
      cep,
      city,
      clt_claim, pj_claim,
      cpf,
      created_at,
      created_by,
      creator_id,
      disc2_result,
      email,
      extration_ref,
      gender,
      homeoffice,
      id,
      identify,
      identify_id,
      impedido,
      mother_name,
      name,
      open_to_work,
      phone,
      photo_url,
      professional_about,
      professional_title,
      quati_result,
      state,
      status,
      uds,
      updated_at,
      updated_by,
      username_id,
      verified
    FROM public.profile
    WHERE id = $1
    `,
      [id]
    );

    return profiles[0];
  }

  async countProfileByIdentify(identify: string) {
    return await this.count({
      where: {
        identify: identify,
        active: true
      }
    });
  }

  async findLastProfile(): Promise<Profile> {
    return await this.findOne({
      where: { active: true },
      order: { created_at: 'DESC' }
    });
  }

  async findProfileByEmail(email: string): Promise<Profile> {
    return await this.findOne({ email });
  }

  async findProfileByNameAndCpf(
    name: string,
    birthdate: Date
  ): Promise<Profile> {
    return this.findOne({ name, birthdate });
  }

  async updateProfileId(id, data) {
    return await this.update(id, data);
  }

  async updateProfile(data: UpdateProfileDTO, id: string) {
    const tags = data.tags;
    delete data.tags;
    data.id = id;
    data.category_id = data.category_id ? +data.category_id : null;
    const profile = await this.save({ ...data, tags });
    return profile;
  }

  async countProfileOrigin() {
    const cadastrosPortalDeVagas = await this.count({
      where: { origin: ProfileOrigin.PortalDeVagas, active: true }
    });
    const cadastrosUsuariosInternos = await this.count({
      where: { origin: ProfileOrigin.CadastroInterno, active: true }
    });
    const cadastrosCrawlerLinkedin = await this.count({
      where: { origin: ProfileOrigin.Importacao, active: true }
    });
    return {
      cadastrosPortalDeVagas: cadastrosPortalDeVagas,
      cadastrosUsuariosInternos: cadastrosUsuariosInternos,
      cadastrosCrawlerLinkedin: cadastrosCrawlerLinkedin
    };
  }

  async updateProfilePhoto(id: string, photo_url: string) {
    return await this.update({ id: id }, { photo_url: photo_url });
  }

  async findProfileByPhone(phone: string) {
    try {
      return await this.findOne({
        where: {
          phone: ILike(`%${phone}%`)
        }
      })
    } catch (error) {
      console.log(error)
    }

  }
}