import { Test, TestingModule } from '@nestjs/testing'
import { GetSearchProfilesService } from './search.service'
import { SearchProfilesRepository } from '../repositories'
import { mockSearchProfileDTO, mockSearchRepository } from '../mocks'
import { GetProfileBySearchController } from '../controllers'

describe('GetProfileByEmailService', () => {
  let getSearchProfilesService: GetSearchProfilesService
  let getProfileBySearchController: GetProfileBySearchController
  let searchProfilesRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetSearchProfilesService,
        { provide: SearchProfilesRepository, useFactory: mockSearchRepository }
      ],
      controllers: [
        GetProfileBySearchController
      ]
    }).compile()

    getSearchProfilesService = module.get<GetSearchProfilesService>(GetSearchProfilesService)
    searchProfilesRepository = module.get<SearchProfilesRepository>(SearchProfilesRepository)
    getProfileBySearchController = module.get<GetProfileBySearchController>(GetProfileBySearchController)
  })

  describe('GetProfileByEmail', () => {
    test('should return false if email not exists', async () => {
      const search = mockSearchProfileDTO()
      searchProfilesRepository.findProfiles.mockResolvedValue(search)
      searchProfilesRepository.countProfiles.mockResolvedValue(search)
      getProfileBySearchController.handle(["Administrador"], search)
      /*  searchProfilesRepository.countProfiles.mockResolvedValue(search) */
      const getSearch = await getSearchProfilesService.list({ page: 1, records_per_page: 20, search: '2' })
      expect(getSearch).toBeTruthy()
    })
  })
})
