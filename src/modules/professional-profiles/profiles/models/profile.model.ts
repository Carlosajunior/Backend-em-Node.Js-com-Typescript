import { Categories } from '@/modules/categories/entities';
import { DefaultModel } from '@/modules/common/shared/models';
import { TagsToProfile } from '@/modules/common/tags/entities';
import { MessagesToProfile } from '@/modules/messages/entities/message-to-profile.entity';
import { Attachment } from '@/modules/professional-profiles/attachments/entities';
import { Experience } from '@/modules/professional-profiles/experiences/entities';
import { Formation } from '@/modules/professional-profiles/formations/entities';
import { Language } from '@/modules/professional-profiles/languages/entities';
import { BooleanStatus, ProfileAcceptContract, ProfileGender } from '@/modules/professional-profiles/profiles/contansts';
import { Reference } from '@/modules/professional-profiles/references/entities';
import { SocialMedia } from '@/modules/professional-profiles/social-medias/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Address } from '../../address/entities/address.entity';
import { Observation } from '../../observations/entities';

export type ProfileModel = DefaultModel & {
  identify_id: number;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  birthdate: Date;
  mother_name: string;
  gender: ProfileGender;
  cep: string;
  state: string;
  city: string;
  accept_contract: ProfileAcceptContract;
  clt_claim: number;
  pj_claim: number;
  professional_title?: string;
  professional_about: string;
  quati_result: string;
  disc2_result: string;
  homeoffice: BooleanStatus;
  uds: BooleanStatus;
  impedido: BooleanStatus;
  created_by: string;
  updated_by: string;
  username_id: string;
  alocated_by: string;
  status: string;
  origin: string;
  extration_ref?: Date;
  tags?: TagsToProfile[];
  identify: string;
  photo_url: string;
  open_to_work: BooleanStatus;
  verified: BooleanStatus;
  attachments: Attachment[];
  experiences: Experience[];
  formations: Formation[];
  languages: Language[];
  references: Reference[];
  social_medias: SocialMedia[];
  observations: Observation[];
  category: Categories;
  category_id: number;
  creator_id: string;
  creator: User;
  updater_id: string;
  updater: User;
  address_id: string
  address: Address
  active: boolean
};