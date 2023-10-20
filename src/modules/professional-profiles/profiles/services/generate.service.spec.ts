import { Test, TestingModule } from '@nestjs/testing'
import { datatype } from 'faker'

import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories'
import { mockProfilesRepository } from '@/modules/professional-profiles/profiles/mocks'
import { GenerateService } from './generate.service'

describe('GenerateService', () => {
  let generateService: GenerateService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateService,
        { provide: ProfilesRepository, useFactory: mockProfilesRepository }
      ]
    }).compile()

    generateService = module.get<GenerateService>(GenerateService)
  })

  describe('GetProfileByEmail', () => {

    test('should return generate number wizard', async () => {
      const getPad = await generateService.numberWizard(datatype.string())
      expect(getPad).toBeDefined()
    })

  })
})
