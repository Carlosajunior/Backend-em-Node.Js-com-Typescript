import { datatype } from "faker";
import { FunnelConstants } from "../../constants";
import { UpdateFunnelDto } from "../../dto/update-funnel.dto";

export const mockUpdateFunnelDTO = (): UpdateFunnelDto => ({
    name: datatype.string(),
    status: FunnelConstants.Active,
    created_by: datatype.string(),
    creator_id: datatype.string(),
    username_id: datatype.string(),
    columns: []
})