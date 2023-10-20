import { datatype, date, internet, name } from 'faker';
import { mockExperienceModel } from '@/modules/professional-profiles/experiences/mocks';
import { mockFormationModel } from '@/modules/professional-profiles/formations/mocks';
import { mockLanguageModel } from '@/modules/professional-profiles/languages/mocks';
import { CreateProfileDTO } from '@/modules/professional-profiles/profiles/dtos';
import {
  mockProfileAcceptContract,
  mockProfileGender
} from '@/modules/professional-profiles/profiles/mocks';
import { mockReferenceModel } from '@/modules/professional-profiles/references/mocks';
import { mockSocialMediaModel } from '@/modules/professional-profiles/social-medias/mocks';
import { BooleanStatus } from '../../contansts';
import { State } from '@/modules/customers/entities/customer.entity';
import { ProfileOrigin } from '../../contansts/profile-origin.constant';

export const mockCreateProfileDTO = (): CreateProfileDTO => ({
  name: name.findName(),
  phone: '(99) 99999-9999',
  email: internet.email(),
  cpf: '999.999.999-99',
  birthdate: date.past(),
  mother_name: name.findName(),
  gender: mockProfileGender(),
  cep: '999999-99',
  state: State.BA,
  city: datatype.string(),
  accept_contract: mockProfileAcceptContract(),
  clt_claim: datatype.float(),
  pj_claim: datatype.float(),
  professional_title: datatype.string(),
  professional_about: datatype.string(),
  tag_ids: [
    {
      id: datatype.string(),
      tag_id: datatype.string(),
      experience_time: datatype.string()
    }
  ],
  experiences: [mockExperienceModel()],
  formations: [mockFormationModel()],
  languages: [mockLanguageModel()],
  references: [mockReferenceModel()],
  social_medias: [mockSocialMediaModel()],
  origin: ProfileOrigin.CadastroInterno,
  open_to_work: BooleanStatus.True,
  category_id: datatype.number()
});