import { Injectable, NotFoundException } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { ProfilesRepository } from "../repositories";

@Injectable()
export class DeactivateProfileService {
    constructor(
        private readonly profilesRepository: ProfilesRepository,
        private readonly elasticsearchService: ElasticsearchService
    ) { }

    async deactivateProfile(id: string) {
        try {
            const profile = await this.profilesRepository.findOne({ where: { id: id } })
            await this.profilesRepository.update({ id: id }, { active: false })
            return await this.elasticsearchService.updateByQuery({
                index: 'profile',
                refresh: true,
                script: {
                    lang: 'painless',
                    source: 'ctx._source.active = false'
                },
                query: {
                    bool: {
                        must: [
                            {
                                match: {
                                    name: profile.name
                                }
                            },
                            {
                                match: {
                                    identify_id: profile.identify_id
                                }
                            }
                        ]
                    }
                }
            })
        } catch (error) {
            throw new NotFoundException(error)
        }
    }
}