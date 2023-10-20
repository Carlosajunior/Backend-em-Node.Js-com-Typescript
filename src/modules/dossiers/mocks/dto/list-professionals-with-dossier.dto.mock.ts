import { datatype } from "faker";
import { DossierStatus } from "../../constants/dossier-status.constant";
import { ListProfessionalsWithDossierDTO } from "../../dtos/list-professional-with-dossier.dto";

export const mockListProfessionalsWithDossierDTO = (): ListProfessionalsWithDossierDTO => ({
    search: DossierStatus.AWAITING_DOSSIER_GENERATION,
    page: datatype.number(),
    records_per_page: datatype.number()
})