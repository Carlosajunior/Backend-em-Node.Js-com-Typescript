import { Profile } from "@/modules/professional-profiles/profiles/entities"
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm"
import { DefaultEntity } from "../../shared/entities"
import { Tag } from "./tag.entity"

@Entity({ name: 'profiles_tags'})
export class TagsToProfile  extends DefaultEntity {
    @Column()
    tag_id: string

    @Column()
    profile_id: string

    @Column({ nullable: true })
    experience_time: string

    @Column({ nullable: true })
    spotlight: boolean

    @ManyToOne(() => Tag, (tag) => tag.tags_profile)
    @JoinColumn({name: 'tag_id'})
    tag: Tag

    @ManyToOne(() => Profile, (profile) => profile.tags)
    @JoinColumn({name: 'profile_id'})
    profile: Profile
}