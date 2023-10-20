import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { SetMetadata } from '@nestjs/common';

export const Groups = (...groups: AccessProfiles[]) =>
  SetMetadata('groups', groups);
