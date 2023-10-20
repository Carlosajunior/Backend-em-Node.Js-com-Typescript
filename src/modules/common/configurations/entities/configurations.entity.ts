import { Column, Entity } from "typeorm";
import { DefaultEntity } from "../../shared/entities";

@Entity()
export class Configurations extends DefaultEntity {
    @Column()
    configuration_name: string

    @Column()
    configuration: string
}
