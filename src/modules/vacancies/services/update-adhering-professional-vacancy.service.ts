import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateAdheringProfessionalsOnVacancyDTO } from "../dtos/update-adhering-professional-vacancy.dto";
import { handleVacancyCandidates } from "../queues/jobs/handle-vacancy-candidates";
import { VacancyRepository } from "../repositories/vacancy.repository";

@Injectable()
export class UpdateAdheringProfessionalsOnVacancyService {
    public constructor(private readonly vacancyRepository: VacancyRepository) { }

    async updateAdheringProfessionalsOnVacancy(data: UpdateAdheringProfessionalsOnVacancyDTO) {
        try {
            const vacancy = await this.vacancyRepository.findOne(data.vacancy_id)
            handleVacancyCandidates(vacancy)
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
}