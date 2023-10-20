import { Test, TestingModule } from '@nestjs/testing'
import { ListTagsService } from '@/modules/common/tags/services'
import { TagsRepository } from '@/modules/common/tags/repositories'
import { mockTagsRepository, mockListTagsDTO, mockTagModel } from '@/modules/common/tags/mocks'
import { INestApplication, HttpService, HttpModule } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import request from 'supertest'
import { of } from 'rxjs'
import { ListTagsController } from '../controllers'

jest.setTimeout(10000);

describe('ListTagsService', () => {
  let listTagsService: ListTagsService
  let tagsRepository: any
  let httpService: HttpService
  let app: INestApplication
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        ListTagsService,
        { provide: TagsRepository, useFactory: mockTagsRepository }
      ],
      controllers: [
        ListTagsController
      ]
    }).compile()

    listTagsService = module.get<ListTagsService>(ListTagsService)
    tagsRepository = module.get<TagsRepository>(TagsRepository)
    app = module.createNestApplication()
    httpService = module.get<HttpService>(HttpService)
    await app.init()
  })

  describe('ListTag', () => {

    test('should endpoint call', async () => {
      const result: AxiosResponse = {
        data: mockListTagsDTO,
        status: 200,
        statusText: 'true',
        headers: {},
        config: {}
      }
      jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(result))
      const response = await request(app.getHttpServer())
        .get('/tags')
      expect(response.status).toEqual(200)
    })

    test('should call repo findTags function correct if no params passed', async () => {
      await listTagsService.list({})
      expect(tagsRepository.findTags).toHaveBeenCalledWith({
        category: undefined,
        page: 1,
        search: '',
        to_approve: false,
        records_per_page: 20
      })
    })

    test('should call repo findTags function correct if params passed', async () => {
      const params = mockListTagsDTO()
      await listTagsService.list(params)
      expect(tagsRepository.findTags).toHaveBeenCalledWith(params)
    })

    test('should return findtags result', async () => {
      const params = mockListTagsDTO()
      const tags = [mockTagModel()]
      tagsRepository.findTags.mockResolvedValue(tags)
      const result = await listTagsService.list(params)
      expect(result).toBe(tags)
    })
  })
})
