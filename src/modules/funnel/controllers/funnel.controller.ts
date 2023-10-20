import { BadRequestException, Body, Controller, Get, Headers, NotAcceptableException, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AuditRepository } from '../../audit/repositories';
import { Groups } from '../../common/auth/decorators/groups.decorator';
import { TokenDecode } from '../../common/auth/helpers/token-decode.helper';
import { RequestContext } from '../../common/auth/middlewares';
import { TokenPayload } from '../../common/auth/models/token-payload.model';
import { AccessProfiles } from '../../common/shared/constants/access-profiles';
import { CreateFunnelDto } from '../dto/create-funnel.dto';
import FindFunnelDto from '../dto/list-funnel.dto';
import { UpdateFunnelDto } from '../dto/update-funnel.dto';
import { FunnelService } from '../services/funnel.service';
@Controller('funnel')
@ApiTags('funnel')
export class FunnelController {
  constructor(
    private readonly funnelService: FunnelService,
    private readonly auditRepository: AuditRepository
  ) { }

  @Post()
  async createFunnel(
    @Headers('groups') headers: Array<string>,
    @Body() createFunnelDto: CreateFunnelDto
  ) {
    if (
      headers.includes('Administrador') ||
      headers.includes('GestaoRecrutamento') ||
      headers.includes('Comercial') ||
      headers.includes('GestaoComercial')
    ) {
      const funnel = await this.funnelService.create(createFunnelDto);
      const event = RequestContext.currentevent();
      if (event) {
        await this.auditRepository.createAudit(event);
      }
      return funnel;
    }
    throw new NotAcceptableException();
  }

  @Get()
  async handle(
    @Headers('groups') headers: Array<string>,
    @Query() { page, status, records_per_page, search }: FindFunnelDto
  ) {
    if (
      headers.includes('Administrador') ||
      headers.includes('Comercial') ||
      headers.includes('GestaoComercial') ||
      headers.includes('GestaoRecrutamento') ||
      headers.includes('Administrativo') ||
      headers.includes('Recrutador')
    ) {
      return this.funnelService.list({
        page: page && Math.floor(page),
        status,
        records_per_page: records_per_page && Math.floor(records_per_page),
        search
      });
    }
    throw new NotAcceptableException();
  }

  @Put(':id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async updateFunnel(
    @Param() id: string,
    @Body() updateFunnelDto: UpdateFunnelDto,
    @Req() request: Request
  ) {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];

      const tokenPayload = TokenDecode.decode<TokenPayload>(token);

      const funnel = await this.funnelService.update(
        id,
        updateFunnelDto,
        tokenPayload['cognito:groups']
      );
      const event = RequestContext.currentevent();
      if (event && event?.event_description?.length > 0) {
        await this.auditRepository.createAudit(event);
      }
      return funnel;
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Patch(':id')
  async updateFunnelStatus(
    @Headers('groups') headers: Array<string>,
    @Param('id') id: string,
    @Body() updateFunnelDto: UpdateFunnelDto
  ) {
    if (
      headers.includes('Administrador') ||
      headers.includes('GestaoRecrutamento') ||
      headers.includes('Comercial') ||
      headers.includes('GestaoComercial')
    ) {
      const funnel = await this.funnelService.updateStatus(
        id,
        updateFunnelDto.status
      );
      const event = RequestContext.currentevent();
      if (event && event?.event_description?.length > 0) {
        await this.auditRepository.createAudit(event);
      }
      return funnel;
    }
    throw new NotAcceptableException();
  }
}
