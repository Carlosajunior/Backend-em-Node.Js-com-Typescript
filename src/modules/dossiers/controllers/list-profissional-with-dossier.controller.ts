import { BadRequestException, Controller, Get, NotAcceptableException, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DossierStatus } from "../constants/dossier-status.constant";
import { ProfileDataStatus } from "../constants/profile-data-status.constant";
import { ListAllProfessionalsInDossierDTO } from "../dtos/list-all-professionals-in-dossier.dto";
import { ListProfessionalsWithDossierDTO } from "../dtos/list-professional-with-dossier.dto";
import { ListProfessionalsWithDossierService } from "../services/list-professional-with-dossier.service";

@Controller('dossiers/professionals')
@ApiTags('list professional with dossier')
export class ListProfessionalsWithDossierController {
    constructor(private readonly listProfessionalsWithDossierService: ListProfessionalsWithDossierService) { }

    @Get()
    async listProfessionalsWithDossier(@Query() data: ListProfessionalsWithDossierDTO) {
        try {
            if (data.search.includes(DossierStatus.AWAITING_DOSSIER_GENERATION) || data.search.includes(DossierStatus.EMAIL_SENT) || data.search.includes(DossierStatus.GENERATED_DOSSIER) || data.search.includes(DossierStatus.EXPIRED_EMAIL) || data.search.includes(DossierStatus.EMAIL_ERROR)) {
                return await this.listProfessionalsWithDossierService.getProfilesListByDossierStatus(data)
            }
            else if (data.search.includes(ProfileDataStatus.APPROVED) || data.search.includes(ProfileDataStatus.DISAPPROVED)) {
                return await this.listProfessionalsWithDossierService.getProfilesListByProfileDataStatus(data)
            }
            throw new NotAcceptableException()
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    @Get('all')
    async listAllProfessionalsInDossier(@Query() data: ListAllProfessionalsInDossierDTO) {
        try {
            return await this.listProfessionalsWithDossierService.getAllProfilesInDossierList(data)
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}