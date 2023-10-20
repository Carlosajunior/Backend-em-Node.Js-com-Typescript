import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { DecodeTokenService } from '@/modules/common/auth/services/decode-token.service';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateVacancyDTO } from '../dtos/create-vacancy.dto';
import { SearchVacanciesDTO } from '../dtos/search-vacancies.dto';
import { ShowVacancyDTO } from '../dtos/show-vacancy.dto';
import { UpdateVacancyDTO } from '../dtos/update-vacancy.dto';
import { CreateVacancyService } from '../services/create-vacancy.service';
import { ListVacanciesService } from '../services/list-vacancies.service';
import { ShowVacancyService } from '../services/show-vacancy.service';
import { UpdateVacancyService } from '../services/update-vacancy.service';
import { Request } from 'express';
import { UpdateAdheringProfessionalsOnVacancyService } from '../services/update-adhering-professional-vacancy.service';
import { UpdateAdheringProfessionalsOnVacancyDTO } from '../dtos/update-adhering-professional-vacancy.dto';

@Controller('vacancies')
@ApiTags('vacancies')
export class VacancyController {
  public constructor(
    private readonly createVacancy: CreateVacancyService,
    private readonly decodeToken: DecodeTokenService,
    private readonly listVacancies: ListVacanciesService,
    private readonly showVacancy: ShowVacancyService,
    private readonly updateVacancy: UpdateVacancyService,
    private readonly updateAdheringProfessionalsOnVacancyService: UpdateAdheringProfessionalsOnVacancyService
  ) { }

  @Post('/search')
  @Groups(
    AccessProfiles.ADMINISTRATIVE,
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITER,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  @HttpCode(200)
  public async index(@Body() data: SearchVacanciesDTO) {
    try {
      return await this.listVacancies.execute(data);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Post()
  @HttpCode(201)
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  public async create(@Body() data: CreateVacancyDTO, @Req() request: Request) {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];

      const { email } = this.decodeToken.execute(token);

      await this.createVacancy.execute({ ...data, creator_email: email });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get(':id')
  @HttpCode(200)
  @Groups(
    AccessProfiles.ADMINISTRATIVE,
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITER,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  public async show(@Param() { id }: ShowVacancyDTO) {
    try {
      return await this.showVacancy.execute(id);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Put(':id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  @HttpCode(201)
  public async update(
    @Param('id') id: number,
    @Body() data: UpdateVacancyDTO,
    @Req() request: Request
  ) {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];
      const { email } = this.decodeToken.execute(token);
      await this.updateVacancy.execute({ ...data, id, creator_email: email });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Post('update-adhering-profiles')
  public async updateAdheringProfessionalsOnVacancy(@Body() data: UpdateAdheringProfessionalsOnVacancyDTO) {
    try {
      await this.updateAdheringProfessionalsOnVacancyService.updateAdheringProfessionalsOnVacancy(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
