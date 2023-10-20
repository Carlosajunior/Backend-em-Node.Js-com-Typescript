import { DeleteBehavioralProfileDTO } from '@/modules/professional-profiles/profiles/dtos'
import { mockProfileBehavioralProfile } from '@/modules/professional-profiles/profiles/mocks'
import { datatype } from 'faker'

export const mockDeleteBehavioralProfileDTO = (): DeleteBehavioralProfileDTO => ({
  fieldname: mockProfileBehavioralProfile(),
  url: datatype.string()
})
