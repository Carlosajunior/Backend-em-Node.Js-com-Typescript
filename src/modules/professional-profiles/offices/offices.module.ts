import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficesRepository } from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([OfficesRepository])]
})
export class OfficesModule {}
