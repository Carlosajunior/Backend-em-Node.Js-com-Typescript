import { DefaultModel } from '@/modules/common/shared/models';
import { OfficeModel } from '../../offices/models';

export type ExperienceModel = DefaultModel & {
  description: string;
  company: string;
  position: string;
  initial_date: string;
  end_date: string;
  current_position: string;
  profile_id: string;
  offices: OfficeModel[];
};
