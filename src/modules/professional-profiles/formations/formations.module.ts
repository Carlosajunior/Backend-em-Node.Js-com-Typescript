import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FormationsRepository } from '@/modules/professional-profiles/formations/repositories'
import { FormationController } from '@/modules/professional-profiles/formations/controllers'
import { FormationService } from '@/modules/professional-profiles/formations/services'

@Module({
  imports: [TypeOrmModule.forFeature([FormationsRepository])],
  controllers: [FormationController],
  providers: [FormationService]
})
export class FormationsModule {}
