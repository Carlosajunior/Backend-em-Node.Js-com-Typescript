import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAuditDTO } from '../dtos';
import { UpdateAuditService } from '../services';
import { CreateAuditService } from '../services/create-audit.service';

@Controller('history')
@ApiTags('history')
export class CreateAuditController {
  constructor(
    private readonly createAuditService: CreateAuditService,
    private readonly updateCreatorIdService: UpdateAuditService
  ) {}

  @Post('create-log')
  async createAudit(@Body() data: CreateAuditDTO) {
    try {
      return this.createAuditService.createAudit(data);
    } catch (error) {
      return new BadRequestException(error);
    }
  }

  @Post('update-creator-id')
  async updateCreatorId() {
    try {
      return this.updateCreatorIdService.updateCreatorId();
    } catch (error) {
      return new BadRequestException(error);
    }
  }
}
