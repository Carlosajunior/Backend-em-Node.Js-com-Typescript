import { DefaultModel } from "@/modules/common/shared/models";
import { Profile } from "@/modules/professional-profiles/profiles/entities";
import { Message } from "../entities/message.entity";

export type MessageToProfileModel = DefaultModel & {
    message_id: string
    profile_id: string
    message: Message
    profile: Profile
}