import { DefaultEntity } from '@/modules/common/shared/entities';
import Contact from '@/modules/customers/contact/entities/contact.entity';
import { Profile } from '@/modules/professional-profiles/profiles/entities';
import { VacancyService } from '@/modules/vacancies/constants/vacancy-service.constants';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({
  name: 'offers'
})
export default class Offer extends DefaultEntity {
  @Column()
  commercial_name: string;

  @Column()
  recruiter_name: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  remuneration: number;

  @Column()
  start_date: Date;

  @Column()
  status: string;

  @Column({
    type: 'enum',
    enum: VacancyService
  })
  type_of_contract: VacancyService;

  @Column({
    nullable: true
  })
  customer_contact_id?: string;

  @Column()
  professional_profile_id: string;

  @Column()
  vacancy_id: number;

  @ManyToOne(() => Contact, (contact) => contact.id)
  @JoinColumn({ name: 'customer_contact_id' })
  customer_contact: Contact;

  @ManyToOne(() => Profile, (profile) => profile.id)
  @JoinColumn({ name: 'professional_profile_id' })
  professional_profile: Profile;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: Vacancy;
}
