import { DefaultEntity } from "@/modules/common/shared/entities";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Experience } from "../../experiences/entities";

@Entity()
export class Office extends DefaultEntity {
  @Column()
  name: string

  @Column({ nullable: true })
  duration: string

  @Column({ nullable: true })
  location: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  initial_date: string

  @Column({ nullable: true })
  end_date: string

  @Column({ nullable: true })
  current_position: string

  @Column()
  experience_id: string

  @ManyToOne(() => Experience, experince => experince.offices, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: 'experience_id' })
  experience?: Experience
}

