import { Injectable, NotFoundException } from "@nestjs/common";
import { ProfilesRepository } from "../repositories";

@Injectable()
export class GetProfileOriginCountService {
    constructor(private readonly profileRepository: ProfilesRepository) { }

    async getProfileOriginCount() {
        try {
            return await this.profileRepository.countProfileOrigin()
        } catch (error) {
            return new NotFoundException()
        }
    }
}