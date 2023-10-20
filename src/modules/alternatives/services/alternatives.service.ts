import { Injectable, NotAcceptableException } from "@nestjs/common";
import { CreateAlternativeDTO } from "../dto/create-alternative.dto";
import { UpdateAlternativeDTO } from "../dto/update-alternative.dto";
import { AlternativesRepository } from "../repositories/alternatives.repository";

@Injectable()
export class AlternativesService {
    constructor(private readonly alternativesRepository: AlternativesRepository) { }

    async createAlternative(data: CreateAlternativeDTO) {
        try {
            const alternative = await this.alternativesRepository.create(data)
            await this.alternativesRepository.save(alternative)
            return alternative
        } catch (error) {
            throw new NotAcceptableException(error)
        }
    }

    async updateAlternative(data: UpdateAlternativeDTO) {
        try {
            const id = data.id
            delete data.id
            return await this.alternativesRepository.update({ id: id }, data)
        } catch (error) {
            throw new NotAcceptableException(error)
        }
    }
}