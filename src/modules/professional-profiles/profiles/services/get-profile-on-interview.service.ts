import { Injectable, NotFoundException } from "@nestjs/common";
import { createQueryBuilder } from "typeorm";
import { GetProfilesOnInterviewDTO } from "../dtos/get-profile-on-interview.dto";
import { GetProfilesOnInterviewAdvancedSearchDTO } from "../dtos/get-profiles-on-interview-advanced-search.dto";
import { Profile } from "../entities";

@Injectable()
export class GetProfilesOnInterviewService {

    async getProfilesOnInterview(data: GetProfilesOnInterviewDTO) {
        try {
            let last_page = (data.page - 1) * data.records_per_page > 0 ? data.page - 1 : null
            const profiles = await createQueryBuilder<Profile>('Profile')
                .leftJoin('Profile.observations', 'observations')
                .leftJoin('observations.column', 'columns')
                .orWhere("columns.name  = 'Entrevistados aguardando feedback' ")
                .orWhere("columns.name  = 'Aguardando entrevista' ")
                .andWhere('Profile.active = true')
                .orderBy('Profile.name', 'ASC')
                .take(data.records_per_page ? data.records_per_page : 15)
                .skip(data.page ? (data.page - 1) * data.records_per_page : null)
                .getManyAndCount()
            return {
                results: profiles[0],
                page: data.page,
                last_page: last_page,
                total_results: profiles[1],
                total_pages: Math.ceil(profiles[1] / (data.records_per_page ? data.records_per_page : 15))
            };
        } catch (error) {
            console.log(error)
            return new NotFoundException()
        }
    }

    async getProfilesOnInterviewAdvancedSearch(data: GetProfilesOnInterviewAdvancedSearchDTO) {
        try {
            let last_page = (data.page - 1) * data.records_per_page > 0 ? data.page - 1 : null
            const profiles = await createQueryBuilder<Profile>('Profile')
                .leftJoin('Profile.observations', 'observations')
                .leftJoin('observations.column', 'columns')
                .leftJoin('observations.vacancy', 'vacancy')
            if (data.on_interview == "true") {
                profiles.andWhere("((columns.name  = 'Entrevistados aguardando feedback') OR (columns.name  = 'Aguardando entrevista'))")
            }
            else if (data.on_interview == "false") {
                profiles.andWhere("columns.name  != 'Entrevistados aguardando feedback' ")
                profiles.andWhere("columns.name  != 'Aguardando entrevista' ")
            }
            if (data.email)
                profiles.andWhere(`Profile.email = '${data.email}'`)
            if (data.name)
                profiles.andWhere(`Profile.name ilike '${data.name}%'`)
            if (data.vacancy_title)
                profiles.andWhere(`vacancy.title ilike '${data.vacancy_title}%'`)
            profiles.andWhere('Profile.active = true')
            const results = await profiles.orderBy('Profile.name', 'ASC')
                .take(data.records_per_page ? data.records_per_page : 15)
                .skip(data.page ? (data.page - 1) * data.records_per_page : null)
                .getManyAndCount()
            return {
                results: results[0],
                page: data.page,
                last_page: last_page,
                total_results: results[1],
                total_pages: Math.ceil(results[1] / (data.records_per_page ? data.records_per_page : 15))
            };
        } catch (error) {
            console.log(error)
            return new NotFoundException()
        }
    }
}