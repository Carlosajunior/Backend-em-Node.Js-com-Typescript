import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/repositories/user.repository';
import { TemplatesController } from './controllers/templates.controller';

import { TemplateRepository } from './repositories/template.repository';
import { TemplatesService } from './services/templates.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, TemplateRepository])],
  controllers: [TemplatesController],
  providers: [TemplatesService]
})
export class TemplatesModule {}
