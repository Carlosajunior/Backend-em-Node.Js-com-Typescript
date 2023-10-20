import { DefaultEntity } from "@/modules/common/shared/entities";
import { Questions } from "@/modules/questions/entities/question.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Alternatives extends DefaultEntity {
    @Column({ nullable: false })
    description: string

    @Column({ nullable: false })
    question_id: string

    @ManyToOne(() => Questions, (questions) => questions.id)
    @JoinColumn({ name: 'question_id' })
    question: Questions
}
