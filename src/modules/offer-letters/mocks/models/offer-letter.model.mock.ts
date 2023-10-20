import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { User } from "@/modules/users/entities/user.entity";
import { WorkModel } from "@/modules/vacancies/constants/work-model.constant";
import { mockVacancyModel } from "@/modules/vacancies/mocks/models/vacancy.model.mock";
import { datatype } from "faker";
import { ExecutionTime } from "../../constants/execution-time.constant";
import { TypeOfContract } from "../../constants/type-of-contract.constant";
import { OfferLetterModel } from "../../models/offer-letter.model";
import { mockOfferLetterTemplateModel } from "./offer-letter-template.model.mock";

export const mockOfferLetterModel = (): OfferLetterModel => ({
    ...mockDefaultModel(),
    area: datatype.string(),
    execution_time: ExecutionTime.APPOINTED_HOURS,
    has_provisional_equipment_to_start: datatype.boolean(),
    manager: datatype.string(),
    mentor: datatype.string(),
    role: datatype.string(),
    salary_clt: datatype.number(),
    send_equipment: datatype.boolean(),
    start_date: new Date(),
    t_shirt_size: datatype.string(),
    time_purchase_pj: datatype.number(),
    type_of_contract: TypeOfContract.CLT,
    work_model: WorkModel.REMOTE,
    work_schedule_from: datatype.number(),
    work_schedule_to: datatype.number(),
    offer_letter_template_id: datatype.string(),
    user_id: datatype.string(),
    vacancy_id: datatype.number(),
    offer_letter_template: mockOfferLetterTemplateModel(),
    user: new User(),
    vacancy: mockVacancyModel()
})