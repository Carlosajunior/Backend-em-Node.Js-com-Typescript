import { Module } from '@nestjs/common';
import { TagUpdateService } from './services/tag-update.service';
import { TagUpdateGateway } from './controllers/tag-update.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesTagsRepository } from '@/modules/professional-profiles/profiles/profiles-tags/repositories/profiles-tags.repository';
import { ExperiencesRepository } from '@/modules/professional-profiles/experiences/repositories';
import { ProfilesRepository } from '@/modules/professional-profiles/profiles/repositories';
import { TagsRepository } from '../repositories';
import { ConfigurationsRepository } from '../../configurations/repositories/configurations.repository';

@Module({
  imports: [TypeOrmModule.forFeature([
    ProfilesTagsRepository,
    ExperiencesRepository,
    ProfilesRepository,
    TagsRepository,
    ConfigurationsRepository
  ])],
  providers: [TagUpdateGateway, TagUpdateService]
})
export class TagUpdateModule { }
