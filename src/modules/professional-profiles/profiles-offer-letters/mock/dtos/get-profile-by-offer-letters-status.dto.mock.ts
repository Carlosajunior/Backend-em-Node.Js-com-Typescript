import { datatype } from "faker";
import { OfferLetterStatusEnum } from "../../constants/offer-letter-status.constant";
import { GetProfileByOfferLetterStatusDTO } from "../../dto/get-profile-by-offer-letters-status.dto";

export const mockGetProfileByOfferLetterStatusDTO = (): GetProfileByOfferLetterStatusDTO => ({
    status: OfferLetterStatusEnum.Enviada,
    vacancy_title: datatype.string(),
    page: datatype.number(),
    records_per_page: datatype.number()
})