import { NotAcceptableException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockCreateAlternativeDTO } from '../mocks/dto/create-alternative.dto.mock';
import { mockUpdateAlternativeDTO } from '../mocks/dto/update-alternative.dto.mock';
import { mockAlternativesRepository } from '../mocks/repositories/alternatives.repository.mock';
import { AlternativesRepository } from '../repositories/alternatives.repository';
import { AlternativesService } from './alternatives.service';


describe('AnswersService', () => {
    let service: AlternativesService;
    let alternativesRepository: any

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AlternativesService,
                { provide: AlternativesRepository, useFactory: mockAlternativesRepository }
            ],
        }).compile();

        alternativesRepository = module.get<AlternativesRepository>(AlternativesRepository);
        service = module.get<AlternativesService>(AlternativesService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create and return alternative.', async () => {
        const alternative = mockCreateAlternativeDTO()
        alternativesRepository.create = jest.fn().mockResolvedValue(alternative)
        alternativesRepository.save = jest.fn().mockResolvedValue(alternative)
        const result = await service.createAlternative(alternative)
        expect(result).toBe(alternative)
    })

    it('should throw an error at create.', async () => {
        const alternative = mockCreateAlternativeDTO()
        jest.spyOn(service, 'createAlternative').mockRejectedValueOnce(new NotAcceptableException())
        expect(service.createAlternative(alternative)).rejects.toThrowError()
    })

    it('should update an alternative.', async () => {
        const alternative = mockUpdateAlternativeDTO()
        alternativesRepository.update = jest.fn().mockResolvedValue({
            "generatedMaps": [],
            "raw": [],
            "affected": 1
        })
        const result = await service.updateAlternative(alternative)
        expect(result.affected).toBe(1)
    })

    it('should throw an error at update.', async () => {
        const alternative = mockUpdateAlternativeDTO()
        jest.spyOn(service, 'updateAlternative').mockRejectedValueOnce(new NotAcceptableException())
        expect(service.updateAlternative(alternative)).rejects.toThrowError()
    })
});

