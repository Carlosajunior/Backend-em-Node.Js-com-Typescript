import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlternativesController } from './controllers/alternatives.controller';
import { AlternativesRepository } from './repositories/alternatives.repository';
import { AlternativesService } from './services/alternatives.service';


@Module({
  imports: [TypeOrmModule.forFeature([
    AlternativesRepository
  ])],
  controllers: [AlternativesController],
  providers: [AlternativesService]
})
export class AlternativesModule { }
