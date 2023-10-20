import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { DecodeTokenService } from '@/modules/common/auth/services/decode-token.service';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { BadRequestException, Controller, HttpCode, Param, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ReplicateVacancyDTO } from '../dtos/replicate-vacancy.dto';
import { ReplicateVacancyService } from '../services/replicate-vacancy.service';

@ApiTags('vacancies')
@Controller('vacancies')
export class ReplicateVacancyController {
  public constructor(
    private readonly decodeToken: DecodeTokenService,
    private readonly replicateVacancy: ReplicateVacancyService
  ) { }

  @Post('replicate/:id')
  @HttpCode(201)
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  public async create(
    @Param() { id }: ReplicateVacancyDTO,
    @Req() request: Request
  ) {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];
      const { email } = this.decodeToken.execute(token);
      return await this.replicateVacancy.execute({ id, creator_email: email });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
