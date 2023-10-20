import { DefaultModel } from "@/modules/common/shared/models";
import { User } from "@/modules/users/entities/user.entity";
import { WorkModel } from "@/modules/vacancies/constants/work-model.constant";
import { Vacancy } from "@/modules/vacancies/entities/vacancy.entity";
import { ExecutionTime } from "../constants/execution-time.constant";
import { TypeOfContract } from "../constants/type-of-contract.constant";
import { OfferLetterTemplate } from "../entities/offer-letter-template.entity";

export type OfferLetterModel = DefaultModel & {
    area: string,
    execution_time: ExecutionTime,
    has_provisional_equipment_to_start: boolean,
    manager: string,
    mentor: string,
    role: string,
    salary_clt: number,
    send_equipment: boolean,
    start_date: Date,
    t_shirt_size: string,
    time_purchase_pj: number,
    type_of_contract: TypeOfContract,
    work_model: WorkModel,
    work_schedule_from: number,
    work_schedule_to: number,
    offer_letter_template_id: string,
    user_id: string,
    vacancy_id: number,
    offer_letter_template: OfferLetterTemplate,
    user: User,
    vacancy: Vacancy
}