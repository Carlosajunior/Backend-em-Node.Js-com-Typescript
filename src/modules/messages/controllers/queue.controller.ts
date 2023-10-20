import { AuditRepository } from '@/modules/audit/repositories';
import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { RequestContext } from '@/modules/common/auth/middlewares';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageDTO } from '../dtos/send-message.dto';
import { SendMessageProducer } from '../queue/send-message.producer';
@Controller('queue')
@ApiTags('messages')
export class QueueController {
  constructor(
    private sendMessageProducerService: SendMessageProducer,
    private auditRepository: AuditRepository
  ) {}

  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.RECRUITER,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  @Post()
  @HttpCode(201)
  public async create(@Body() data: SendMessageDTO) {
    try {
      const response = await this.sendMessageProducerService.sendMessage(data);
      const event = RequestContext.currentevent();
      if (event) {
        await this.auditRepository.createAudit(event);
      }
      return response;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
