import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TemplateDTO } from '../dtos';
import { QueryParams } from '../dtos/query-params.dto';
import { TemplatesService } from '../services/templates.service';

@Controller('templates')
@ApiTags('message templates')
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) { }

  @Post()
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async create(@Body() body: TemplateDTO) {
    try {
      return await this.templatesService.create(body);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get()
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT,
    AccessProfiles.RECRUITER
  )
  async search(
    @Query() { page, records_per_page, search, type, active }: QueryParams
  ) {
    try {
      return this.templatesService.list({
        page: page && Math.floor(page),
        records_per_page: records_per_page && Math.floor(records_per_page),
        search,
        type,
        active
      });
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
  async updateTemplate(@Param() id: string, @Body() body: TemplateDTO) {
    try {
      return await this.templatesService.update(id, body);
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  @Patch('/status/:id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async changeStatus(@Param('id') id: string) {
    try {
      return this.templatesService.changeStatus(id);
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  @Delete(':id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  public async delete(@Param('id') id: string) {
    try {
      return await this.templatesService.deleteTemplate(id);
    } catch (error) {
      throw new BadRequestException(error)
    }

  }
}
