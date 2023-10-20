import { HttpService, INestApplication, HttpModule, BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AxiosResponse } from "axios";
import { mockCreateLanguageDTO, mockLanguageModel, mockLanguagesRepository } from "../mocks";
import { mockSearchLanguageDTO } from "../mocks/dtos/search-language-dto.mock";
import { LanguagesRepository } from "../repositories";
import { LanguagesServices } from "./languages.service";
import request from 'supertest'
import { of } from 'rxjs'
import { datatype } from "faker";
import { LanguagesController } from "../controllers";

describe('LanguagesServices', () => {
    let service: LanguagesServices;
    let languagesRepository: any
    let httpService: HttpService
    let app: INestApplication

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [LanguagesServices,
                { provide: LanguagesRepository, useFactory: mockLanguagesRepository }
            ],
            controllers: [
                LanguagesController
            ]
        }).compile();

        languagesRepository = module.get<LanguagesRepository>(LanguagesRepository)
        service = module.get<LanguagesServices>(LanguagesServices);
        app = module.createNestApplication()
        httpService = module.get<HttpService>(HttpService)
        await app.init()

    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create language.', async () => {
        const createLanguageDTO = mockCreateLanguageDTO()
        const language = mockLanguageModel()
        language.language = createLanguageDTO.language
        language.level = createLanguageDTO.level
        languagesRepository.findOne = jest.fn().mockResolvedValue(null)
        languagesRepository.createLang = jest.fn().mockResolvedValue(language)
        const result = await service.create(createLanguageDTO)
        expect(result).toEqual({
            id: language.id,
            language: createLanguageDTO.language,
            level: createLanguageDTO.level
        })
    })

    it('should list languages.', async () => {
        const searchLanguageDTO = mockSearchLanguageDTO()
        const languages = [mockLanguageModel()]
        languagesRepository.findLangByTap = jest.fn().mockResolvedValue({
            results: languages,
            search_limit: Math.ceil(searchLanguageDTO.records_limit),
            total_results: languages.length
        })
        const result = await service.list(searchLanguageDTO)
        expect(result).toEqual({
            results: languages,
            search_limit: Math.ceil(searchLanguageDTO.records_limit),
            total_results: languages.length
        })
    })

    test('should endpoint call', async () => {
        const createLanguageDTO = mockCreateLanguageDTO()
        const result: AxiosResponse = {
            data: createLanguageDTO,
            status: 201,
            statusText: 'true',
            headers: {},
            config: {}
        }
        jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(result))
        const response = await request(app.getHttpServer())
            .post('/languages')
        expect(response.status).toEqual(201)
    })

    test('should return false if vacancy not exists', async () => {
        const createLanguageDTO = mockCreateLanguageDTO()
        await languagesRepository.createLang.mockResolvedValue(createLanguageDTO)
        const getViewVacancy = await service.create(createLanguageDTO)
        expect(getViewVacancy).toBeTruthy()
    })

    test('should call CreateProfile correct if profile does not exists and profile is complet', async () => {
        const createLanguageDTO = mockCreateLanguageDTO()
        const id = datatype.number()
        await languagesRepository.createLang.mockResolvedValue(createLanguageDTO)
        await languagesRepository.findLangByIds.mockResolvedValue(id)
        await service.create(createLanguageDTO)
        expect(languagesRepository.createLang).toHaveBeenCalledWith({ ...createLanguageDTO })
    })

    test('should call CreateProfile correct if profile does not exists and profile is complet', async () => {
        const createLanguageDTO = mockCreateLanguageDTO()
        await languagesRepository.findLangByName.mockResolvedValue(datatype.string(), datatype.string())
        await expect(service.create(createLanguageDTO)).rejects.toEqual(new BadRequestException('Language already exists'))
    })
})