import { DefaultEntity } from '@/modules/common/shared/entities';
import { Contract } from '@/modules/contracts/entities/contract.entity';
import { User } from '@/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne
} from 'typeorm';
import Contact from '../contact/entities/contact.entity';
import Logo from '../logo/entities/logo.entity';
import { CustomerModel } from '../model/customer.model';

export enum State {
  AC = 'AC',
  AL = 'AL',
  AM = 'AM',
  AP = 'AP',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MG = 'MG',
  MS = 'MS',
  MT = 'MT',
  PA = 'PA',
  PB = 'PB',
  PE = 'PE',
  PI = 'PI',
  PR = 'PR',
  RJ = 'RJ',
  RN = 'RN',
  RR = 'RR',
  RS = 'RS',
  SC = 'SC',
  SE = 'SE',
  SP = 'SP',
  TO = 'TO'
}

@Entity()
export class Customer extends DefaultEntity implements CustomerModel {
  @Column({ type: 'varchar', length: 7, nullable: true })
  customerId?: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 18, nullable: true })
  document: string;

  @Column({ type: 'varchar', length: 16, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  email: string;

  @Column({ type: 'enum', enum: State, nullable: true })
  state: State;

  @Column({ type: 'varchar', length: 60, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  notes: string;

  @OneToOne(() => Logo, { nullable: true })
  @JoinColumn()
  logo: Logo;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  username_id: string;

  @Column({ nullable: true })
  clt_benefits: string;

  @Column({ nullable: true })
  pj_benefits: string;

  @Column({ nullable: true })
  creator_id: string;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToMany(() => Contact, (contact) => contact.customer, {
    cascade: ['insert']
  })
  contacts?: Contact[];

  @OneToMany(() => Contract, (contract) => contract.customer)
  contracts?: Contract[];
}
