import { Injectable } from '@nestjs/common';
import { Service } from '@/modules/common/shared/core/service';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import { Profile } from '../entities';

@Injectable()
export class GetProfileByIdService implements Service<string, Profile> {
  constructor(private readonly profilesRepository: ProfilesRepository) { }

  public async execute(id: string): Promise<Profile> {
    return await this.profilesRepository.findProfileById(id);
  }
}
