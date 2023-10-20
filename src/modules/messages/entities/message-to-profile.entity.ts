import { DefaultEntity } from "@/modules/common/shared/entities"
import { Profile } from "@/modules/professional-profiles/profiles/entities"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { Message } from "./message.entity"

@Entity({ name: 'profiles_messages'})
export class MessagesToProfile  extends DefaultEntity {
    @Column()
    message_id: string

    @Column()
    profile_id: string

    @ManyToOne(() => Message, (message) => message.messages_profile)
    @JoinColumn({name: 'message_id'})
    message: Message

    @ManyToOne(() => Profile, (profile) => profile.messages)
    @JoinColumn({name: 'profile_id'})
    profile: Profile
}