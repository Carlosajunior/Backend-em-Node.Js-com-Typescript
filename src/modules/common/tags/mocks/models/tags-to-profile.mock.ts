import { mockDefaultModel } from "@/modules/common/shared/mocks";
import { mockProfileModel } from "@/modules/professional-profiles/profiles/mocks/models/profile.model.mock";
import { datatype } from "faker";
import { mockTagModel } from "..";
import { TagsToProfileModel } from "../../models/tags-to-profile.model";

export const mockTagsToProfileModel = (): TagsToProfileModel => ({
    ...mockDefaultModel(),
    tag_id: datatype.string(),
    profile_id: datatype.string(),
    experience_time: datatype.string(),
    spotlight: datatype.boolean(),
    tag: mockTagModel(),
    profile: mockProfileModel()
})