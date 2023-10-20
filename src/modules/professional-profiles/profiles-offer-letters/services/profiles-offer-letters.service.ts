import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { GetProfileByOfferLetterStatusDTO } from '../dto/get-profile-by-offer-letters-status.dto';
import { ProfileOfferLettersRepository } from '../repositories/profile-offer-letters.repository';

@Injectable()
export class ProfilesOfferLettersService {
    constructor(private readonly profileOfferLettersRepository: ProfileOfferLettersRepository) { }

    async getProfileByOfferLetterStatus(data: GetProfileByOfferLetterStatusDTO) {
        try {
            let last_page = (data.page - 1) * data.records_per_page > 0 ? data.page - 1 : null
            const profiles = (await this.profileOfferLettersRepository.find({
                relations: ['profile', 'offer_letters', 'offer_letters.vacancy'],
                where: {
                    status: data.status,
                    profile: {
                        active: true
                    }
                },
                take: data.records_per_page ? data.records_per_page : 15,
                skip: data.page ? (data.page - 1) * data.records_per_page : null
            })).map((profiles) => Object.assign(profiles.profile, { type_of_contract: profiles.offer_letters.type_of_contract }, { title: profiles.offer_letters.vacancy.title }, { recruiter: profiles.offer_letters.vacancy.recruiter }))
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
