import { datatype } from "faker";
import { GetProfilePortalDeVagasDTO } from "../../dtos/get-profile-portal-vagas.dto";

export const mockGetProfilePortalDeVagasDTO = (): GetProfilePortalDeVagasDTO => ({
    page: datatype.number(),
    records_per_page: datatype.number()
})