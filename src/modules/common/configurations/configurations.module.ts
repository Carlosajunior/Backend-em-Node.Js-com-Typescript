import { Module } from '@nestjs/common';
import { ConfigurationsService } from './services/configurations.service';
import { ConfigurationsController } from './controllers/configurations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationsRepository } from './repositories/configurations.repository';
@Module({
  imports: [TypeOrmModule.forFeature([
    ConfigurationsRepository
  ])],
  controllers: [ConfigurationsController],
  providers: [ConfigurationsService]
})
export class ConfigurationsModule { }
