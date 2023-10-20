import { Groups } from '@/modules/common/auth/decorators/groups.decorator';
import { TokenDecode } from '@/modules/common/auth/helpers/token-decode.helper';
import { TokenPayload } from '@/modules/common/auth/models/token-payload.model';
import { AccessProfiles } from '@/modules/common/shared/constants/access-profiles';
import { BadRequestException, Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetRolesDTO } from '../dto/get-roles.dto';
import { RolesService } from '../services/roles.service';
import { Request } from 'express';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Get(':id')
  @Groups(
    AccessProfiles.ADMINISTRATOR,
    AccessProfiles.ADMINISTRATIVE,
    AccessProfiles.COMMERCIAL,
    AccessProfiles.COMMERCIAL_MANAGEMENT,
    AccessProfiles.RECRUITER,
    AccessProfiles.RECRUITMENT_MANAGEMENT
  )
  async listRoles(@Req() request: Request, @Query() data: GetRolesDTO) {
    try {
      const token = request?.headers?.authorization?.split(' ')[1];
      const tokenPayload = TokenDecode.decode<TokenPayload>(token);
      return await this.rolesService.listRoles(data, tokenPayload['cognito:groups'])
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
  @Get('/details/:id')
  async getRoleDetaisl(@Param('id') id: string) {
    try {
      return await this.rolesService.getRoleDetails(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
