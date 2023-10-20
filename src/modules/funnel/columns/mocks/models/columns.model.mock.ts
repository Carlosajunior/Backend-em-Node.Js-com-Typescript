import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { mockFunnel } from "@/modules/funnel/mocks/model/funnel.model.mock";
import { datatype } from "faker";
import { ColumnsModel } from "../../models";

export const mockColumnModel = (): ColumnsModel => ({
    ...mockDefaultModel(),
    name: datatype.string(),
    funnelId: datatype.string(),
    postinterview: datatype.boolean(),
    preinterview: datatype.boolean(),
    index: datatype.number(),
    total: datatype.number(),
    id: datatype.string(),
    created_at: new Date(),
    updated_at: new Date(),
    funnel: mockFunnel()
})