import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { DecodeTokenService } from '@/modules/common/auth/services/decode-token.service';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { BadRequestException, Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CreateOfferLetterTemplateDTO } from '../dtos/create-offer-letter-template.dto';
import { SearchOfferLettersTemplatesLisDTO } from '../dtos/search-offer-letters-templates-list.dto';
import { UpdateOfferLetterTemplateDTO } from '../dtos/update-offer-letter-template.dto';
import { ChangeStatusOfferLetterTemplateByIdService } from '../services/change-status-offer-letter-template-by-id.service';
import { CreateOfferLetterTemplateService } from '../services/create-offer-letter-template.service';
import { DeleteOfferLetterTemplateByIdService } from '../services/delete-offer-letter-template-by-id.service';
import { ListOfferLetterTemplatesService } from '../services/list-offer-letter-templates.service';
import { ShowOfferLetterTemplateService } from '../services/show-offer-letter-template.service';
import { UpdateOfferLetterTemplateService } from '../services/update-offer-letter-template.service';

@Controller('offer-letters/templates')
@ApiTags('offer letters templates')
class OfferLetterTemplateController {
  public constructor(
    private readonly changeTemplate: ChangeStatusOfferLetterTemplateByIdService,
    private readonly createTemplate: CreateOfferLetterTemplateService,
    private readonly decodeToken: DecodeTokenService,
    private readonly deleteTemplate: DeleteOfferLetterTemplateByIdService,
    private readonly listTemplates: ListOfferLetterTemplatesService,
    private readonly showTemplate: ShowOfferLetterTemplateService,
    private readonly updateTemplate: UpdateOfferLetterTemplateService
  ) { }

  @Post()
  @HttpCode(201)
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  public async create(
    @Body() data: CreateOfferLetterTemplateDTO,
    @Req() request: Request
  ): Promise<void> {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];

      const { email } = this.decodeToken.execute(token);

      await this.createTemplate.execute({ ...data, user_email: email });
    } catch (error) {
      throw new BadRequestException(error)
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
  public async index(@Query() query: SearchOfferLettersTemplatesLisDTO) {
    try {
      return await this.listTemplates.execute(query);
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
      await this.deleteTemplate.execute(id);
    } catch (error) {
      throw new BadRequestException(error)
    }

  }

  @Patch(':id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  public async patchStatus(@Param('id') id: string) {
    try {
      await this.changeTemplate.execute(id);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get(':id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT,
    AccessProfiles.RECRUITER
  )
  public async show(@Param('id') id: string) {
    try {
      return await this.showTemplate.execute(id);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Put(':id')
  @HttpCode(201)
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  public async update(
    @Param('id') id: string,
    @Body() data: UpdateOfferLetterTemplateDTO
  ): Promise<void> {
    try {
      await this.updateTemplate.execute({ ...data, id });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}

export { OfferLetterTemplateController };
