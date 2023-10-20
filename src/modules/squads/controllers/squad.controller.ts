import { Body, Controller, Get, InternalServerErrorException, Param, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { listSquadMembersDTO } from '../dtos/list-members-squad.dto';
import { ListSquadsDTO } from '../dtos/list-squads.dto';
import { UpdateSquadDTO } from '../dtos/update-squad.dto';
import { SquadsService } from '../services/squads.service';

@Controller('squads')
@ApiTags('squads')
export class SquadController {
  constructor(private readonly squadService: SquadsService) { }

  @Get('/search/')
  async listSquadsSearch(@Query() data: ListSquadsDTO) {
    try {
      return await this.squadService.listSquadsSearch(data);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Get()
  async listSquads() {
    try {
      return await this.squadService.listSquads()
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Get('members')
  async listSquadMembers(@Query() data: listSquadMembersDTO) {
    try {
      return await this.squadService.listSquadMembers(data)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Patch()
  async updateSquad(@Body() data: UpdateSquadDTO) {
    try {
      return await this.squadService.updateSquad(data)
    } catch (error) {
      throw new InternalServerErrorException
    }
  }
}
