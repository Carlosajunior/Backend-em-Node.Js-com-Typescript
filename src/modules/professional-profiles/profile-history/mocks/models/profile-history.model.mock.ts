import { AuditModule } from "@/modules/audit/constants";
import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { datatype } from "faker";
import { ProfileHistoryEvent } from "../../constants";
import { ProfileHistoryModel } from "../../models";

export const mockProfileHistoryModel = (): ProfileHistoryModel => ({
    ...mockDefaultModel(),
    event_type: ProfileHistoryEvent.Insert,
    user_id: datatype.string(),
    username: datatype.string(),
    user_email: datatype.string(),
    event_description: [datatype.string()],
    table_name: datatype.string(),
    entity_id: datatype.string(),
    ip: datatype.string(),
    module: AuditModule.Professional,
    old_value: null,
    new_value: null
})