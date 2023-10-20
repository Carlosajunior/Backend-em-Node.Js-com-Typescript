import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SocialMediasRepository } from '@/modules/professional-profiles/social-medias/repositories'
import { SocialMediaController } from './controllers'
import { SocialMediaService } from './services'

@Module({
  imports: [TypeOrmModule.forFeature([SocialMediasRepository])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService]
})
export class SocialMediasModule {}
