import { Test, TestingModule } from '@nestjs/testing'
import { datatype, internet } from 'faker'
import { mockProfilesRepository } from '../mocks'
import { ProfilesRepository } from '../repositories'
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch'
import { mockProfileModel } from '../mocks/models/profile.model.mock'
import { DeactivateProfileService } from './deactive-profile.service'

describe('DeactivateProfileService', () => {
    let service: DeactivateProfileService
    let profileRepository: any
    let elasticsearchService: ElasticsearchService
    const mockedNode = internet.url();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ElasticsearchModule.register({ node: mockedNode })],
            providers: [
                DeactivateProfileService,
                { provide: ProfilesRepository, useFactory: mockProfilesRepository }
            ]
        }).compile()

        elasticsearchService = module.get<ElasticsearchService>(ElasticsearchService)
        service = module.get<DeactivateProfileService>(DeactivateProfileService)
        profileRepository = module.get<ProfilesRepository>(ProfilesRepository)
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it("should deactivate a profile by it's id.", async () => {
        const profile = mockProfileModel()
        profileRepository.findOne = jest.fn().mockResolvedValue(profile)
        profileRepository.update = jest.fn().mockResolvedValue(null)
        elasticsearchService.updateByQuery = jest.fn().mockResolvedValue({
            "_shards": {
                "total": 0,
                "successful": 0,
                "failed": 0
            },
            "_index": "test",
            "_id": "1",
            "_version": 2,
            "_primary_term": 1,
            "_seq_no": 1,
            "result": "noop"
        })
        const result = await service.deactivateProfile(datatype.string())
        expect(result).toEqual({
            "_shards": {
                "total": 0,
                "successful": 0,
                "failed": 0
            },
            "_index": "test",
            "_id": "1",
            "_version": 2,
            "_primary_term": 1,
            "_seq_no": 1,
            "result": "noop"
        })
    });
})
