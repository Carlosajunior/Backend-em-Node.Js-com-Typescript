import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { mockProfileModel } from "@/modules/professional-profiles/profiles/mocks/models/profile.model.mock";
import { datatype } from "faker";
import { MessageToProfileModel } from "../../models/message-to-profile.model";
import { mockMessageModel } from "./message.model.mock";

export const mockMessageToProfile = (): MessageToProfileModel => ({
    ...mockDefaultModel(),
    message_id: datatype.string(),
    profile_id: datatype.string(),
    message: mockMessageModel(),
    profile: mockProfileModel(),
})