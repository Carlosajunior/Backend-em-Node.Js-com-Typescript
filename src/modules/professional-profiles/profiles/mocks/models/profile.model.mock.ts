import { mockCategoriesModel } from '@/modules/categories/mocks/models/categories.model.mock';
import { mockDefaultModel } from '@/modules/common/shared/mocks';
import { mockTagsToProfileModel } from '@/modules/common/tags/mocks/models/tags-to-profile.mock';
import { State } from '@/modules/customers/entities/customer.entity';
import { mockMessageToProfile } from '@/modules/messages/mocks/models/message-to-profile.model.mock';
import { mockAttachmentModel } from '@/modules/professional-profiles/attachments/mocks/models/attachment.model.mock';
import { mockExperienceModel } from '@/modules/professional-profiles/experiences/mocks';
import { mockFormationModel } from '@/modules/professional-profiles/formations/mocks';
import { mockLanguageModel } from '@/modules/professional-profiles/languages/mocks';
import { mockObservationModel } from '@/modules/professional-profiles/observations/mocks/models/observations.model.mock';
import { mockReferenceModel } from '@/modules/professional-profiles/references/mocks';
import { mockSocialMediaModel } from '@/modules/professional-profiles/social-medias/mocks';
import { datatype, random } from 'faker';
import {
  BooleanStatus,
  ProfileAcceptContract,
  ProfileGender
} from '../../contansts';
import { ProfileModel } from '../../models';

export const mockProfileModel = (): ProfileModel => ({
  ...mockDefaultModel(),
  identify_id: datatype.number(),
  name: datatype.string(),
  phone: datatype.string(),
  email: datatype.string(),
  cpf: datatype.string(),
  birthdate: new Date(),
  mother_name: datatype.string(),
  gender: ProfileGender.NoBinary,
  cep: datatype.string(),
  state: random.arrayElement(Object.values(State)),
  city: datatype.string(),
  accept_contract: ProfileAcceptContract.CltAndPj,
  clt_claim: datatype.float(),
  pj_claim: datatype.float(),
  professional_title: datatype.string(),
  professional_about: datatype.string(),
  quati_result: datatype.string(),
  disc2_result: datatype.string(),
  homeoffice: BooleanStatus.True,
  uds: BooleanStatus.True,
  impedido: BooleanStatus.False,
  created_by: datatype.string(),
  updated_by: datatype.string(),
  username_id: datatype.string(),
  alocated_by: datatype.string(),
  status: datatype.string(),
  origin: datatype.string(),
  extration_ref: new Date(),
  identify: datatype.string(),
  photo_url: datatype.string(),
  open_to_work: BooleanStatus.True,
  verified: BooleanStatus.True,
  attachments: [mockAttachmentModel()],
  experiences: [mockExperienceModel()],
  formations: [mockFormationModel()],
  languages: [mockLanguageModel()],
  references: [mockReferenceModel()],
  social_medias: [mockSocialMediaModel()],
  observations: [mockObservationModel()],
  category: mockCategoriesModel(),
  category_id: datatype.number(),
  creator: null,
  creator_id: datatype.string(),
  updater: null,
  updater_id: datatype.string(),
  address: null,
  address_id: datatype.string(),
  active: datatype.boolean()
});
