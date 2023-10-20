import { MessageType } from "@/modules/messages/dtos";
import { datatype } from "faker";
import { TemplateStatus } from "../../constants/template-status.constant";
import { TemplateDTO } from "../../dtos";

export const mockTemplateDTO = (): TemplateDTO => ({
    title: datatype.string(),
    type: MessageType.Email,
    description: datatype.string(),
    email_title: datatype.string(),
    vacancy_url_text: datatype.string(),
    whatsapp_text_of_recruiter: datatype.string(),
    created_by: datatype.string(),
    username_id: datatype.string(),
    creator_id: datatype.string(),
    status: TemplateStatus.ACTIVE
})