import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { Profile } from "@/modules/professional-profiles/profiles/entities";
import { datatype } from "faker";
import { AttachmentModel } from "../../models/attachment.model";

export const mockAttachmentModel = (): AttachmentModel => ({
    ...mockDefaultModel(),
    name: datatype.string(),
    url: datatype.string(),
    profile_id: datatype.string(),
    profile: new Profile()
})