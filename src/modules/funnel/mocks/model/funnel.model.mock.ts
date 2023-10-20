import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { datatype } from "faker";
import { FunnelConstants } from "../../constants";
import { FunnelModel } from "../../model/funnel.model";

export const mockFunnel = (): FunnelModel => ({
    ...mockDefaultModel(),
    name: datatype.string(),
    status: FunnelConstants.Active,
    created_by: datatype.string(),
    username_id: datatype.string(),
    creator_id: datatype.string(),
    creator: null
})