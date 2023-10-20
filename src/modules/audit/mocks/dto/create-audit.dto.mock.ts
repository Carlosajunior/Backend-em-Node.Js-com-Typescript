import { datatype } from "faker";
import { AuditEvent, AuditModule } from "../../constants";
import { CreateAuditDTO } from "../../dtos";

export const mockCreateAuditDTO = (): CreateAuditDTO => ({
    event_type: AuditEvent.Insert,
    event_description: [datatype.string()],
    user_id: datatype.string(),
    username: datatype.string(),
    user_email: datatype.string(),
    table_name: datatype.string(),
    entity_id: datatype.string(),
    ip: datatype.string(),
    module: AuditModule.Professional,
    old_value: null,
    new_value: null,
    creator_id: datatype.string(),

})