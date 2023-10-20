import { random } from 'faker'
import { ProfileBehavioralProfile } from '@/modules/professional-profiles/profiles/contansts'

export const mockProfileBehavioralProfile = (): ProfileBehavioralProfile => random.arrayElement(Object.values(ProfileBehavioralProfile))
