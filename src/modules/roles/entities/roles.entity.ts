import { DefaultEntity } from "@/modules/common/shared/entities";
import { User } from "@/modules/users/entities/user.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity({
    name: 'roles'
})
export class Roles extends DefaultEntity {
    @Column({ nullable: false })
    name: string

    @Column({ nullable: false })
    status: boolean

    @Column({ nullable: false })
    description: string

    @OneToMany(() => User, (user) => user.roles)
    users?: User[]
}
