import { datatype, internet, name } from 'faker'
import { CreateProfileDTO } from '@/modules/professional-profiles/profiles/dtos'
import { mockSocialMediaModel } from '@/modules/professional-profiles/social-medias/mocks'
import { BooleanStatus } from '../../contansts'
import { ProfileOrigin } from '../../contansts/profile-origin.constant'

export const mockCreateSimpleProfileDTO = (): CreateProfileDTO => ({
  name: name.findName(),
  phone: '(99) 99999-9999',
  email: internet.email(),
  professional_title: datatype.string(),
  tag_ids: [{ id: datatype.string(), tag_id: datatype.string(), experience_time: datatype.string() }],
  social_medias: [mockSocialMediaModel()],
  origin: ProfileOrigin.CadastroInterno,
  open_to_work: BooleanStatus.True,
  category_id: datatype.number()
})