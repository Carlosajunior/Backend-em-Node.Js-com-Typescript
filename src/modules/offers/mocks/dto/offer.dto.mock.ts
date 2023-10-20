import { VacancyService } from "@/modules/vacancies/constants/vacancy-service.constants";
import { datatype } from "faker";
import { OfferDTO } from "../../dtos/offer.dto";

export const mockOfferDTO = (): OfferDTO => ({
    commercial_name: datatype.string(),
    recruiter_name: datatype.string(),
    remuneration: datatype.number(),
    start_date: new Date(),
    type_of_contract: VacancyService.Allocation,
    customer_contact_id: datatype.string(),
    professional_profile_id: datatype.string(),
    vacancy_id: datatype.number()
})