import { Controller, Get, Headers, NotAcceptableException, Query } from '@nestjs/common'
import { GetProfileByEmailDTO } from '@/modules/professional-profiles/profiles/dtos'
import { GetProfileByEmailService } from '@/modules/professional-profiles/profiles/services'
import { ApiTags } from '@nestjs/swagger'

@Controller('professional-profiles')
@ApiTags("professional profiles")
export class GetProfileByEmailController {
  constructor(private readonly getProfileByEmailService: GetProfileByEmailService) { }

  @Get('find-by-email')
  async handle(@Headers("groups") headers: Array<string>, @Query() query: GetProfileByEmailDTO) {
    if (headers?.includes("Administrador") || headers?.includes("Recrutador") || headers?.includes("GestaoRecrutamento")
      || headers?.includes("Comercial") || headers?.includes("GestaoComercial") || headers?.includes("Administrativo")) {
      return this.getProfileByEmailService.get(query)
    }
    throw new NotAcceptableException()
  }

}
