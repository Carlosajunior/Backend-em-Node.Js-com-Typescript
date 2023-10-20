import { BadRequestException, Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GetProfilePortalDeVagasDTO } from "../dtos/get-profile-portal-vagas.dto";
import { GetProfilesPortalDeVagasService } from "../services/get-profile-portal-vagas.service";

@Controller('professional-profiles')
@ApiTags("professional profiles")
export class GetProfilePortalDeVagasController {
    constructor(private readonly getProfilesPortalDeVagasService: GetProfilesPortalDeVagasService) { }

    @Get('portal-vagas/list')
    async handle(@Query() data: GetProfilePortalDeVagasDTO) {
        try {
            return await this.getProfilesPortalDeVagasService.GetProfilesPortalDeVagas(data)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}