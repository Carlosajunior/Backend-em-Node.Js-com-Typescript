import { WorkModel } from "@/modules/vacancies/constants/work-model.constant";
import { datatype } from "faker";
import { ExecutionTime } from "../../constants/execution-time.constant";
import { TypeOfContract } from "../../constants/type-of-contract.constant";
import { CreateOfferLetterRequest } from "../../services/create-offer-letter.service";

export const mockCreateOfferLetterDTO = (): CreateOfferLetterRequest => ({
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
    work_schedule: '08:00 - 18:00',
    offer_letter_template_id: datatype.string(),
    vacancy_id: datatype.number(),
    user_email: datatype.string()
})