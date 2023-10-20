import { DefaultModel } from "@/modules/common/shared/models";
import { Profile } from "../../profiles/entities";

export type AttachmentModel = DefaultModel & {
    name: string
    url: string
    profile_id: string
    profile: Profile
}