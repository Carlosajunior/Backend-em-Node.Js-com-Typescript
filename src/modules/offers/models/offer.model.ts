import { DefaultModel } from "@/modules/common/shared/models";
import Contact from "@/modules/customers/contact/entities/contact.entity";
import { Profile } from "@/modules/professional-profiles/profiles/entities";
import { VacancyService } from "@/modules/vacancies/constants/vacancy-service.constants";
import { Vacancy } from "@/modules/vacancies/entities/vacancy.entity";

export type OfferModel = DefaultModel & {
    commercial_name: string;
    recruiter_name: string;
    remuneration: number;
    start_date: Date;
    status: string;
    type_of_contract: VacancyService;
    customer_contact_id?: string;
    professional_profile_id: string;
    vacancy_id: number;
    customer_contact: Contact;
    professional_profile: Profile;
    vacancy: Vacancy;

}