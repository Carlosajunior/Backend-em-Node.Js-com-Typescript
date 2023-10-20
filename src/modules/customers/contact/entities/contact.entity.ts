import { DefaultEntity } from '@/modules/common/shared/entities';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from '../../entities/customer.entity';
import { ContactModel } from '../model/contact.model';

@Entity()
export default class Contact extends DefaultEntity {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  cellphone?: string;

  @Column({ type: 'varchar', length: 70, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  role: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  department: string;

  @Column({ nullable: true, default: false, type: 'boolean' })
  is_admin?: boolean;

  @Column({ type: 'uuid' })
  customerId: string;

  @ManyToOne(() => Customer, (customer) => customer.contacts)
  customer: Customer;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.contact)
  vacancies?: Vacancy[];

  @Column()
  active: boolean
}
