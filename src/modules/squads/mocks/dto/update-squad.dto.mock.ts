import { BooleanStatus } from "@/modules/professional-profiles/profiles/contansts";
import { datatype } from "faker";
import { UpdateSquadDTO } from "../../dtos/update-squad.dto";

export const mockUpdateSquadDTO = (): UpdateSquadDTO => ({
    name: datatype.string(),
    is_active: BooleanStatus.False,
    id: datatype.string()
})