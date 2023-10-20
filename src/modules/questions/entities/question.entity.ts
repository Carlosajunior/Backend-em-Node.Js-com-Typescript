import { Alternatives } from "@/modules/alternatives/entities/alternative.entity";
import { Answers } from "@/modules/answers/entities/answer.entity";
import { DefaultEntity } from "@/modules/common/shared/entities";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Questions extends DefaultEntity {
    @Column({ nullable: false })
    title: string

    @Column({ nullable: true })
    updated_by: string

    @OneToMany(() => Alternatives, (alternatives) => alternatives.question)
    alternatives?: Alternatives[]

    @OneToMany(() => Answers, (answers) => answers.question)
    answers?: Answers[]

    @Column()
    status: boolean
}
