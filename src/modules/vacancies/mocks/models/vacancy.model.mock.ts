import { mockCategoriesModel } from "@/modules/categories/mocks/models/categories.model.mock";
import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { mockTagModel } from "@/modules/common/tags/mocks";
import { State } from "@/modules/customers/entities/customer.entity";
import { mockContactModel, mockCustomerModel } from "@/modules/customers/mocks";
import { mockFunnel } from "@/modules/funnel/mocks/model/funnel.model.mock";
import { mockMessageModel } from "@/modules/messages/mocks/models/message.model.mock";
import { User } from "@/modules/users/entities/user.entity";
import { datatype } from "faker";
import { Experience } from "../../constants/experience.constant";
import { VacancyService } from "../../constants/vacancy-service.constants";
import { WorkModel } from "../../constants/work-model.constant";
import { VacancyModel } from "../../models/vacancy.model";
import { mockNoteModel } from "../../notes/mocks/models/note.model.mock";

export const mockVacancyModel = (): VacancyModel => ({
    ...mockDefaultModel(),
    contract_model: datatype.string(),
    city: datatype.string(),
    commercial: new User(),
    created_at: new Date(),
    customer: mockCustomerModel(),
    funnel_id: datatype.string(),
    id: datatype.number(),
    identify: datatype.string(),
    location: datatype.string(),
    partner_company: datatype.string(),
    qtd_apply: datatype.number(),
    recruiter: new User(),
    service: VacancyService.Allocation,
    state: State.BA,
    status: 'Aberto',
    time_purchase: datatype.number(),
    time_purchase_clt: datatype.number(),
    time_purchase_pj: datatype.number(),
    time_sale_value: datatype.number(),
    time_sale_value_clt: datatype.number(),
    time_sale_value_pj: datatype.number(),
    title: datatype.string(),
    total_candidates: datatype.number(),
    total_sent_to_client: datatype.number(),
    updated_at: new Date(),
    work_model: WorkModel.HYBRID,
    desc: datatype.string(),
    requirements: datatype.string(),
    desirable: datatype.string(),
    advantages: datatype.string(),
    create_at: new Date(),
    expire_at: new Date(),
    experience: Experience.JUNIOR,
    project_time: datatype.string(),
    complement_values: datatype.string(),
    complement_values_clt: datatype.string(),
    complement_values_pj: datatype.string(),
    status_comments: datatype.string(),
    category_id: datatype.number(),
    customer_id: datatype.string(),
    commercial_id: datatype.string(),
    contact_id: datatype.string(),
    recruiter_id: datatype.string(),
    conferred: datatype.boolean(),
    category: mockCategoriesModel(),
    contact: mockContactModel(),
    funnel: mockFunnel(),
    tags: [mockTagModel()],
    message: [mockMessageModel()],
    notes: [mockNoteModel()]
})