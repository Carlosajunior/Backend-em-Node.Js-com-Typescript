import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { Service } from '@/modules/common/shared/core/service';
import { Injectable, NotFoundException } from '@nestjs/common';

export interface UserGroup {
  label: string;
  value: AccessProfiles;
}

@Injectable()
export class ListUsersGroupsService implements Service<void, UserGroup[]> {
  public execute(): UserGroup[] {
    try {
      return Object.keys(AccessProfiles).map((item) => {
        return {
          label: AccessProfiles[item]
            .split(/(?=[A-ZÀ-Ú])/)
            .join(' ')
            .replace('Gestao', 'Gestão')
            .trim() as string,
          value: AccessProfiles[item] as AccessProfiles
        };
      });
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
