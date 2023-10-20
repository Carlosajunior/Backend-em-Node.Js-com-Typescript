import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { mockContactModel } from "@/modules/customers/mocks";
import { mockProfileModel } from "@/modules/professional-profiles/profiles/mocks/models/profile.model.mock";
import { VacancyService } from "@/modules/vacancies/constants/vacancy-service.constants";
import { mockVacancyModel } from "@/modules/vacancies/mocks/models/vacancy.model.mock";
import { datatype } from "faker";
import { OfferModel } from "../../models/offer.model";

export const mockOfferModel = (): OfferModel => ({
    ...mockDefaultModel(),
    commercial_name: datatype.string(),
    recruiter_name: datatype.string(),
    remuneration: datatype.number(),
    start_date: new Date(),
    status: datatype.string(),
    type_of_contract: VacancyService.Allocation,
    customer_contact_id: datatype.string(),
    professional_profile_id: datatype.string(),
    vacancy_id: datatype.number(),
    customer_contact: mockContactModel(),
    professional_profile: mockProfileModel(),
    vacancy: mockVacancyModel()

})