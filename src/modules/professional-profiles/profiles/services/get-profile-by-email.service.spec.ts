import { Test, TestingModule } from '@nestjs/testing'
import { internet } from 'faker'

import { GetProfileByEmailService } from '@/modules/professional-profiles/profiles/services'
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories'
import { mockCreateProfileDTO, mockProfilesRepository } from '@/modules/professional-profiles/profiles/mocks'

describe('GetProfileByEmailService', () => {
  let getProfileByEmailService: GetProfileByEmailService
  let profilesRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProfileByEmailService,
        { provide: ProfilesRepository, useFactory: mockProfilesRepository }
      ]
    }).compile()

    getProfileByEmailService = module.get<GetProfileByEmailService>(GetProfileByEmailService)
    profilesRepository = module.get<ProfilesRepository>(ProfilesRepository)
  })

  describe('GetProfileByEmail', () => {
    test('should return false if email not exists', async () => {
      const profile = mockCreateProfileDTO()
      profilesRepository.findProfileByEmail.mockResolvedValue(profile)
      const getProfileByEmail = await getProfileByEmailService.get({ email: profile.email })

      expect(getProfileByEmail).toBe(true)
    })

    test('should return true if email exists', async () => {
      const getProfileByEmail = await getProfileByEmailService.get({ email: internet.email() })

      expect(getProfileByEmail).toBe(false)
    })
  })
})
