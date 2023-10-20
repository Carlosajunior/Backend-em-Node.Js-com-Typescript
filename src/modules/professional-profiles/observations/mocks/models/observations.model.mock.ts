import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { mockColumnModel } from "@/modules/funnel/columns/mocks/models/columns.model.mock";
import { User } from "@/modules/users/entities/user.entity";
import { datatype } from "faker";
import { ObservationsModel } from "../../models/observations.model";

export const mockObservationModel = (): ObservationsModel => ({
    ...mockDefaultModel(),
    note: datatype.string(),
    identify: datatype.string(),
    status: datatype.string(),
    vacancy_id: datatype.string(),
    profile_id: datatype.string(),
    linked_by: datatype.string(),
    column_id: datatype.string(),
    contact_date: new Date(),
    recruiter_id: datatype.string(),
    recruiter: new User(),
    column: mockColumnModel()

})