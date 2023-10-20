import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ProfileHistory } from '../entities'
import { GetProfileHistoryByIdService } from '../services'

@Controller('professional-profiles')
@ApiTags("professional profile history")
export class GetProfileByProfileIdController {
  constructor(private readonly getProfileHistoryByIdService: GetProfileHistoryByIdService) { }

  @Get('history/:id')
  async handle(@Param('id') id): Promise<ProfileHistory[]> {
    try {
      return this.getProfileHistoryByIdService.get(id)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }
}
