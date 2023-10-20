import { Injectable, NotFoundException } from "@nestjs/common";
import { IsNull, Not } from "typeorm";
import { ListAllProfessionalsInDossierDTO } from "../dtos/list-all-professionals-in-dossier.dto";
import { ListProfessionalsWithDossierDTO } from "../dtos/list-professional-with-dossier.dto";
import { DossierRepository } from "../repositories/dossier.repository";

@Injectable()
export class ListProfessionalsWithDossierService {
    constructor(private readonly dossierRepository: DossierRepository) { }

    async getProfilesListByDossierStatus(data: ListProfessionalsWithDossierDTO) {
        try {
            let last_page = (data.page - 1) * data.records_per_page > 0 ? data.page - 1 : null

            let profiles = (await this.dossierRepository.find({
                relations: ['observation', 'observation.profile'],
                where: {
                    dossier_status: data.search,
                    observation: {
                        profile: {
                            active: true
                        }
                    }
                },
                take: data.records_per_page ? data.records_per_page : 15,
                skip: data.page ? (data.page - 1) * data.records_per_page : null
            })).map((x) => x.observation.profile)
            return {
                results: profiles,
                page: data.page,
                last_page: last_page,
                total_results: profiles.length,
                total_pages: Math.ceil(profiles.length / (data.records_per_page ? data.records_per_page : 15))
            };
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    async getProfilesListByProfileDataStatus(data: ListProfessionalsWithDossierDTO) {
        try {
            let last_page = (data.page - 1) * data.records_per_page > 0 ? data.page - 1 : null

            let profiles = (await this.dossierRepository.find({
                relations: ['observation', 'observation.profile'],
                where: {
                    profile_data_status: data.search,
                    observation: {
                        profile: {
                            active: true
                        }
                    }

                },
                take: data.records_per_page ? data.records_per_page : 15,
                skip: data.page ? (data.page - 1) * data.records_per_page : null
            })).map((x) => x.observation.profile)
            return {
                results: profiles,
                page: data.page,
                last_page: last_page,
                total_results: profiles.length,
                total_pages: Math.ceil(profiles.length / (data.records_per_page ? data.records_per_page : 15))
            };
        } catch (error) {
            throw new NotFoundException(error)
        }
    }

    async getAllProfilesInDossierList(data: ListAllProfessionalsInDossierDTO) {
        try {
            let last_page = (data.page - 1) * data.records_per_page > 0 ? data.page - 1 : null

            let profiles = (await this.dossierRepository.find({
                relations: ['observation', 'observation.profile'],
                where: [
                    {
                        dossier_status: Not(IsNull()),
                        observation: {
                            profile: {
                                active: true
                            }
                        }
                    },
                    {
                        profile_data_status: Not(IsNull()),
                        observation: {
                            profile: {
                                active: true
                            }
                        }
                    }
                ],
                take: data.records_per_page ? data.records_per_page : 15,
                skip: data.page ? (data.page - 1) * data.records_per_page : null
            })).map((x) => x.observation.profile)
            return {
                results: profiles,
                page: data.page,
                last_page: last_page,
                total_results: profiles.length,
                total_pages: Math.ceil(profiles.length / (data.records_per_page ? data.records_per_page : 15))
            };
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
}