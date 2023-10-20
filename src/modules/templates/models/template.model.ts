import { DefaultModel } from "@/modules/common/shared/models";
import { User } from "@/modules/users/entities/user.entity";
import { TemplateStatus } from "../constants/template-status.constant";

export type TemplateModel = DefaultModel & {
    title: string;
    type: string;
    description: string;
    created_by: string;
    username_id: string;
    active: boolean;
    status: TemplateStatus;
    email_title: string;
    vacancy_url_text: string;
    whatsapp_text_of_recruiter: string;
    creator_id: string;
    creator: User;
}  
