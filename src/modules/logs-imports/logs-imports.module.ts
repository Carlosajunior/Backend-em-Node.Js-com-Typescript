import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogsImportsRepository } from './repositories/logs-imports.repository';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            LogsImportsRepository,
        ])
    ],
})
export class LogsImportsModule { }
