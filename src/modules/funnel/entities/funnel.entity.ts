import { DefaultEntity } from '@/modules/common/shared/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Columns } from '../columns/entities';
import { FunnelConstants } from '../constants';
import { FunnelModel } from '../model/funnel.model';

@Entity()
export default class Funnel extends DefaultEntity {
  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;

  @Column({
    type: 'enum',
    enum: FunnelConstants,
    nullable: true,
    default: 'Ativo'
  })
  status: FunnelConstants;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  username_id: string;

  @Column({ nullable: true })
  creator_id: string;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @OneToMany(() => Columns, (columns) => columns.funnel, {
    cascade: ['insert', 'update']
  })
  columns?: Columns[];

  @OneToMany(() => Vacancy, (vacancy) => vacancy.funnel, {
    cascade: ['insert', 'update']
  })
  vacancies?: Vacancy[];
}
