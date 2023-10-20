import { DefaultEntity } from '@/modules/common/shared/entities';
import { User } from '@/modules/users/entities/user.entity';
import { WorkModel } from '@/modules/vacancies/constants/work-model.constant';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ExecutionTime } from '../constants/execution-time.constant';
import { TypeOfContract } from '../constants/type-of-contract.constant';
import { OfferLetterTemplate } from './offer-letter-template.entity';

@Entity({
  name: 'offer_letters'
})
export class OfferLetter extends DefaultEntity {
  @Column()
  area: string;

  @Column({ enum: ExecutionTime, nullable: true })
  execution_time: ExecutionTime;

  @Column()
  has_provisional_equipment_to_start: boolean;

  @Column()
  manager: string;

  @Column({ nullable: true })
  mentor: string;

  @Column()
  role: string;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: true
  })
  salary_clt: number;

  @Column()
  send_equipment: boolean;

  @Column()
  start_date: Date;

  @Column()
  t_shirt_size: string;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: true
  })
  time_purchase_pj: number;

  @Column({ enum: TypeOfContract })
  type_of_contract: TypeOfContract;

  @Column({ enum: WorkModel })
  work_model: WorkModel;

  @Column({ nullable: true })
  work_schedule_from: number;

  @Column({ nullable: true })
  work_schedule_to: number;

  @Column()
  offer_letter_template_id: string;

  @Column()
  user_id: string;

  @Column()
  vacancy_id: number;

  @ManyToOne(
    () => OfferLetterTemplate,
    (OfferLetterTemplate) => OfferLetterTemplate.id,
    {
      cascade: ['insert', 'update'],
      onDelete: 'SET NULL'
    }
  )
  @JoinColumn({ name: 'offer_letter_template_id' })
  offer_letter_template: OfferLetterTemplate;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: Vacancy;
}
