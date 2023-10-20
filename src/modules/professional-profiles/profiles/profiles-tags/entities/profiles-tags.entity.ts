import { DefaultEntity } from "@/modules/common/shared/entities";
import { Column, Entity } from "typeorm";

@Entity()
export class ProfilesTags extends DefaultEntity {
    @Column()
    tag_id: string

    @Column()
    profile_id: string

    @Column()
    experience_time: string

    @Column()
    spotlight: boolean
}