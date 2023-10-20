import { DefaultEntity } from '@/modules/common/shared/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Vacancy } from '../../entities/vacancy.entity';

@Entity()
export class Note extends DefaultEntity {
  @Column({ type: 'varchar', length: 1000 })
  notes: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  customer: string;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  vacancy_id: number;

  @ManyToOne(() => Vacancy, (vacancy) => vacancy.notes)
  @JoinColumn({ name: 'vacancy_id' })
  vacancy: Vacancy;
}
