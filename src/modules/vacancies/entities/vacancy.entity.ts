import { Categories } from '@/modules/categories/entities';
import { Tag } from '@/modules/common/tags/entities';
import Contact from '@/modules/customers/contact/entities/contact.entity';
import { Customer, State } from '@/modules/customers/entities/customer.entity';
import Funnel from '@/modules/funnel/entities/funnel.entity';
import { Message } from '@/modules/messages/entities';
import { Observation } from '@/modules/professional-profiles/observations/entities';
import { User } from '@/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Experience } from '../constants/experience.constant';
import { VacancyService } from '../constants/vacancy-service.constants';
import { WorkModel } from '../constants/work-model.constant';
import { Note } from '../notes/entities/note.entity';
import { VacancyLanguage } from './vacancy_languages.entity';

@Entity({
  name: 'vacancies'
})
export class Vacancy {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  title: string;

  @Column({ nullable: true })
  desc?: string;

  @Column({ nullable: true })
  requirements: string;

  @Column({ nullable: true })
  desirable: string;

  @Column({ nullable: true })
  advantages: string;

  @Column()
  create_at: Date;

  @Column()
  expire_at: Date;

  @Column({ nullable: true, enum: WorkModel })
  work_model: WorkModel;

  @Column({ nullable: true, enum: State })
  state: State;

  @Column({ nullable: true })
  city: string;

  @Column({
    enum: Experience
  })
  experience: Experience;

  @Column({ nullable: true })
  project_time: string;

  @Column({ nullable: true })
  contract_model: string;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: true
  })
  time_sale_value?: number;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: true
  })
  time_purchase?: number;

  @Column({ nullable: true })
  complement_values?: string;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: true
  })
  time_sale_value_pj: number;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: true
  })
  time_purchase_pj: number;

  @Column({ nullable: true })
  complement_values_pj: string;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: true
  })
  time_sale_value_clt: number;

  @Column({
    type: 'numeric',
    precision: 15,
    scale: 2,
    default: 0,
    nullable: true
  })
  time_purchase_clt: number;

  @Column({ nullable: true })
  complement_values_clt: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  status_comments: string;

  @Column({ nullable: true })
  qtd_apply: number;

  @Column({
    type: 'enum',
    enum: VacancyService,
    nullable: true
  })
  service: VacancyService;

  @Column({ nullable: true })
  identify: string;

  @Column({ nullable: true })
  category_id: number;

  @Column({ nullable: true })
  customer_id: string;

  @Column({ nullable: true })
  commercial_id: string;

  @Column({ nullable: true })
  contact_id: string;

  @Column({ nullable: true })
  funnel_id: string;

  @Column({ nullable: true })
  recruiter_id: string;

  @Column({ default: false })
  conferred: boolean;

  @Column()
  partner_company: string;

  @ManyToOne(() => Categories, (categories) => categories.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'commercial_id' })
  commercial: User;

  @ManyToOne(() => Contact, (contact) => contact.id)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @ManyToOne(() => Customer, (customer) => customer.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @ManyToOne(() => Funnel, (funnel) => funnel.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'funnel_id' })
  funnel: Funnel;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'recruiter_id' })
  recruiter: User;

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'vacancies_tags',
    joinColumn: { name: 'vacancy_id' },
    inverseJoinColumn: { name: 'tag_id' }
  })
  tags: Tag[];

  @OneToMany(() => Message, (message) => message.vacancies)
  message: Message[];

  @OneToMany(() => Note, (note) => note.vacancy)
  notes: Note[];

  @OneToMany(() => Observation, (observation) => observation.vacancy, {
    cascade: ['remove']
  })
  observations?: Observation[];

  @OneToMany(() => VacancyLanguage, (vl) => vl.vacancy, {
    cascade: ['remove']
  })
  vacancy_languages?: VacancyLanguage[];
}
