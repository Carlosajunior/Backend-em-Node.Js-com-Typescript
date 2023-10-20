import { Test, TestingModule } from '@nestjs/testing'
import { mockCreateProfileDTO, mockDeleteBehavioralProfileDTO, mockProfilesRepository } from '@/modules/professional-profiles/profiles/mocks'
import { ProfilesRepository } from '../repositories'
import { DeleteBehavioralProfileService } from './delete-behavioral-profile.service'
import { datatype } from 'faker'

describe('DeleteBehavioralProfileService', () => {
  let deleteBehavioralProfileService: DeleteBehavioralProfileService
  let profilesRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteBehavioralProfileService,
        { provide: ProfilesRepository, useFactory: mockProfilesRepository }

      ]
    }).compile()
    deleteBehavioralProfileService = module.get<DeleteBehavioralProfileService>(DeleteBehavioralProfileService)
    profilesRepository = module.get<ProfilesRepository>(ProfilesRepository)
  })

  describe('DeleteBehavioralProfile', () => {
    test('should return affected profile if profile exists', async () => {
      const deleteProfile = mockDeleteBehavioralProfileDTO()
      const id = datatype.string()
      const profile = mockCreateProfileDTO()
      profilesRepository.deleteBehavioralProfileFieldInfo.mockResolvedValue(profile)
      const deletePromise = await deleteBehavioralProfileService.delete(id, deleteProfile)
      expect(deletePromise).toBe(profile)
    })
  })
})
