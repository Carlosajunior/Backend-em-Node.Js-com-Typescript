import { DefaultEntity } from '@/modules/common/shared/entities';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { MessagesToProfile } from './message-to-profile.entity';

@Entity()
export class Message extends DefaultEntity {
  @Column()
  title: string;

  @Column('text', { array: true })
  types: string[];

  @Column()
  sender_name: string;

  @Column()
  sender_email: string;

  @Column({ nullable: true })
  sms_content: string;

  @Column({ nullable: true })
  sms_title?: string;

  @Column({ nullable: true })
  email_content: string;

  @OneToMany(
    () => MessagesToProfile,
    (messagesToProfile) => messagesToProfile.message
  )
  messages_profile?: MessagesToProfile[];

  @ManyToOne(() => Vacancy, (vacancies) => vacancies.message)
  @JoinColumn({ name: 'vacancy_id' })
  vacancies?: Vacancy;

  @Column()
  vacancy_id?: number;
}
