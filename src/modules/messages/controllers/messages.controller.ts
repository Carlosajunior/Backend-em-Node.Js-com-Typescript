import { AuditRepository } from '@/modules/audit/repositories';
import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { RequestContext } from '@/modules/common/auth/middlewares';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { TypeSearch } from '@/modules/common/shared/constants/type-search.constant';
import { BadRequestException, Body, Controller, Get, Headers, HttpCode, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DetailsDTO, SearchDTO } from '../dtos';
import { SendOfferLetterDTO } from '../dtos/send-offer-letter.dto';
import { SendVacancyMessageDTO } from '../dtos/send-vacancy-message.dto';
import { MessageService } from '../services';
import { SendOfferLetterService } from '../services/send-offer-letter.service';
import { SendVacancyMessageService } from '../services/send-vacancy-message.service';

@Controller()
@ApiTags('messages')
export class MessagesController {
  constructor(
    private messageService: MessageService,
    private auditRepository: AuditRepository,
    private sendVacancyMessage: SendVacancyMessageService,
    private sendOfferLetterService: SendOfferLetterService
  ) { }

  @Post('messages')
  @HttpCode(201)
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.RECRUITER,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  public async create(@Body() data: SendVacancyMessageDTO) {
    try {
      await this.sendVacancyMessage.execute(data);
      const event = RequestContext.currentevent();
      if (event) {
        await this.auditRepository.createAudit(event);
      }

      return;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get('messages')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.RECRUITER,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async search(
    @Headers('groups') headers: Array<string>,
    @Query() { page, records_per_page, search, date_start, date_end }: SearchDTO
  ) {
    try {
      return await this.messageService.list(
        {
          type_search: TypeSearch.SEARCH,
          page: page && Math.floor(page),
          records_per_page: records_per_page && Math.floor(records_per_page),
          search,
          date_start,
          date_end
        },
        headers
      );
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Post('messages/search')
  async searchMessage(@Body() data: SearchDTO) {
    try {
      return await this.messageService.listMessages(data);
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get('message-details')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.RECRUITER,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async getContacts(
    @Query() { id, page, records_per_page, search }: DetailsDTO
  ) {
    try {
      return await this.messageService.getRecipientsByMessageId({
        id,
        page: page && Math.floor(page),
        records_per_page: records_per_page && Math.floor(records_per_page),
        search
      });
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Post('offer-letter')
  async sendOfferLetter(@Body() data: SendOfferLetterDTO) {
    try {
      return await this.sendOfferLetterService.execute(data)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
