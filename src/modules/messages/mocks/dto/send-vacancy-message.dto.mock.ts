import { datatype } from "faker";
import { SendVacancyMessageDTO } from "../../dtos/send-vacancy-message.dto";
import { mockRecipientDTO } from "./recipient.dto.mock";

export const mockSendVacancyMessageDTO = (): SendVacancyMessageDTO => ({
    recipients: [mockRecipientDTO()],
    vacancy_id: datatype.number(),
    templates_ids: [datatype.string()]
})