import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { FunnelConstants } from "@/modules/funnel/constants";
import { FunnelModel } from "@/modules/funnel/model/funnel.model";
import { User } from "@/modules/users/entities/user.entity";
import { datatype } from "faker";

export const mockFunnelModel = (): FunnelModel => ({
    ...mockDefaultModel(),
    name: datatype.string(),
    status: FunnelConstants.Active,
    created_by: datatype.string(),
    username_id: datatype.string(),
    creator_id: datatype.string(),
    creator: new User()
})