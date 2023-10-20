import { datatype } from "faker";
import { FunnelConstants } from "../../constants";
import FindFunnelDto from "../../dto/list-funnel.dto";

export const mockFindFunnelDTO = (): FindFunnelDto => ({
    search: datatype.string(),
    status: FunnelConstants.Active,
    page: datatype.number(),
    records_per_page: datatype.number()

})