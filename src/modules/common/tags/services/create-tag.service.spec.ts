import { Test, TestingModule } from '@nestjs/testing'
import { CreateTagService } from '@/modules/common/tags/services'
import { TagsRepository } from '@/modules/common/tags/repositories'
import { mockCreateTagDTO, mockTagsRepository } from '@/modules/common/tags/mocks'
import { INestApplication, HttpService, HttpModule, BadRequestException } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import request from 'supertest'
import { of } from 'rxjs'
import { CreateTagController } from '../controllers'
import { ConfigurationsRepository } from '../../configurations/repositories/configurations.repository'
import { mockConfigurationsRepository } from '../../configurations/mocks/repositories/configurations.repository.mock'

describe('CreateTagService', () => {
  let createTagService: CreateTagService
  let tagsRepository: any
  let configurationsRepository: any
  let httpService: HttpService
  let app: INestApplication
  const setDto = mockCreateTagDTO()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        CreateTagService,
        { provide: TagsRepository, useFactory: mockTagsRepository },
        { provide: ConfigurationsRepository, useFactory: mockConfigurationsRepository }
      ],
      controllers: [
        CreateTagController
      ]
    }).compile()

    createTagService = module.get<CreateTagService>(CreateTagService)
    tagsRepository = module.get<TagsRepository>(TagsRepository)
    configurationsRepository = module.get<ConfigurationsRepository>(ConfigurationsRepository)
    app = module.createNestApplication()
    httpService = module.get<HttpService>(HttpService)
    await app.init()
  })

  describe('CreateTag', () => {

    test('should endpoint call', async () => {
      configurationsRepository.findOne.mockResolvedValue({ configuration: "90" })
      const result: AxiosResponse = {
        data: setDto,
        status: 201,
        statusText: 'true',
        headers: {},
        config: {}
      }
      jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result))
      const response = await request(app.getHttpServer())
        .post('/tags')
      expect(response.status).toEqual(201)
    })

    test('should return BadRequestException if tag already exists', async () => {
      const tag = mockCreateTagDTO()
      tagsRepository.findTagByName.mockResolvedValue(tag)
      const createPromise = createTagService.create(tag)

      expect(createPromise).rejects.toEqual(new BadRequestException('Tag already exists'))
    })

    test('should call createTag correct if tag does not exists', async () => {
      const tag = mockCreateTagDTO()

      tagsRepository.findTagByName.mockResolvedValue(undefined)
      tagsRepository.createTag.mockResolvedValue(tag)
      configurationsRepository.findOne.mockResolvedValue({ configuration: "90" })
      await createTagService.create(tag)

      expect(tagsRepository.createTag).toHaveBeenCalledWith(tag)
    })
  })
})
