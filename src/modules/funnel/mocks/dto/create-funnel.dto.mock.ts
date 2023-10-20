import { datatype } from "faker";
import { FunnelConstants } from "../../constants";
import { CreateFunnelDto } from "../../dto/create-funnel.dto";

export const mockCreateFunnelDTO = (): CreateFunnelDto => ({
    name: datatype.string(),
    status: FunnelConstants.Active,
    created_by: datatype.string(),
    username_id: datatype.string(),
    creator_id: datatype.string()
})