import { DefaultEntity } from "@/modules/common/shared/entities";
import { Column, Entity } from "typeorm";

@Entity()
export class Address extends DefaultEntity {
    @Column()
    city: string

    @Column()
    state: string
}