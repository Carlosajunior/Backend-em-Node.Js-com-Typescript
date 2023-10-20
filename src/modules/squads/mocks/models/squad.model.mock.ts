import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { datatype } from "faker";
import { SquadModel } from "../../models/squad.model";

export const mockSquadModel = (): SquadModel => ({
    ...mockDefaultModel(),
    name: datatype.string(),
    is_active: datatype.boolean()
})