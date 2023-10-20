import { AuditEvent, AuditModule } from '@/modules/audit/constants';
import { AuditModel } from '@/modules/audit/models';
import { DefaultEntity } from '@/modules/common/shared/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Audit extends DefaultEntity implements AuditModel {
  @Column({
    type: 'enum',
    enum: AuditEvent
  })
  event_type: AuditEvent;

  @Column({
    type: 'jsonb'
  })
  event_description: string[];

  @Column({ nullable: true })
  user_id: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  user_email: string;

  @Column({ nullable: true })
  table_name?: string;

  @Column({ nullable: true })
  entity_id?: string;

  @Column({ nullable: true })
  ip: string;

  @Column({
    type: 'enum',
    enum: AuditModule,
    nullable: true
  })
  module: AuditModule;

  @Column({
    type: 'jsonb',
    nullable: true
  })
  old_value?: Record<string, unknown>;

  @Column({
    type: 'jsonb',
    nullable: true
  })
  new_value?: Record<string, unknown>;

  @Column({ nullable: true })
  creator_id: string;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;
}
