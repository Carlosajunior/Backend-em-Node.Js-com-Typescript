import { Injectable, NotFoundException } from "@nestjs/common";
import { GetProfilePortalDeVagasDTO } from "../dtos/get-profile-portal-vagas.dto";
import { ProfilesRepository } from "../repositories";

@Injectable()
export class GetProfilesPortalDeVagasService {
    constructor(private readonly profileRepository: ProfilesRepository) { }

    async GetProfilesPortalDeVagas(data: GetProfilePortalDeVagasDTO) {
        try {
            let last_page = (data.page - 1) * data.records_per_page > 0 ? data.page - 1 : null
            let profiles = (await this.profileRepository.findAndCount({
                where: {
                    created_by: 'Portal de vagas',
                    active: true
                },
                order: {
                    created_at: 'DESC'
                },
                take: data.records_per_page ? data.records_per_page : 15,
                skip: data.page ? (data.page - 1) * data.records_per_page : null
            }))
            return {
                results: profiles[0],
                page: data.page,
                last_page: last_page,
                total_results: profiles[1],
                total_pages: Math.ceil(profiles[1] / (data.records_per_page ? data.records_per_page : 15))
            };
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

}