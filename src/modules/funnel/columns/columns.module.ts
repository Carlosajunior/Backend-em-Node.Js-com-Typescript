import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ColumnsRepository } from './repositories'
import { CreateColumnController, ListColumnsController } from './controllers'
import { CreateColumnService, ListColumnsService } from './services'
import { DeleteColumnService } from './services/delete-column.service'
import { DeleteColumnController } from './controllers/delete-column.controller'
import { AuditRepository } from '@/modules/audit/repositories'

@Module({
  imports: [TypeOrmModule.forFeature([ColumnsRepository, AuditRepository])],
  controllers: [CreateColumnController, ListColumnsController, DeleteColumnController],
  providers: [CreateColumnService, ListColumnsService, DeleteColumnService],
  exports: [CreateColumnService]
})
export class ColumnsModule {}
