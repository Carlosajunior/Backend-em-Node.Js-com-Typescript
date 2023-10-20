import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { datatype } from "faker";
import { RolesModel } from "../../models/roles.model";

export const mockRolesModel = (): RolesModel => ({
    ...mockDefaultModel(),
    name: datatype.string(),
    description: datatype.string(),
    status: datatype.boolean()
})