import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { mockReferenceModel, mockReferencesRepository } from '../mocks';
import { ReferencesRepository } from '../repositories';
import { ReferenceService } from './reference.service';

describe('ReferenceService', () => {
    let service: ReferenceService;
    let referencesRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ReferenceService,
                { provide: ReferencesRepository, useFactory: mockReferencesRepository }
            ],
        }).compile();
        referencesRepository = module.get<ReferencesRepository>(ReferencesRepository);
        service = module.get<ReferenceService>(ReferenceService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return profile references.', async () => {
        const references = [mockReferenceModel()]
        referencesRepository.listReferencesByProfile = jest.fn().mockResolvedValue(references)
        const result = await service.listAllProfileReferences(datatype.string())
        expect(result).toEqual(references)
    });
});
