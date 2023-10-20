import { AuditEvent, AuditModule } from '@/modules/audit/constants'
import { DefaultEntity } from '@/modules/common/shared/entities'
import { Column, Entity } from 'typeorm'
import { ProfileHistoryEvent } from '../constants'
import { ProfileHistoryModel } from '../models'

@Entity()
export class ProfileHistory extends DefaultEntity implements ProfileHistoryModel {
  @Column({
    type: 'enum',
    enum: {... AuditEvent, ...ProfileHistoryEvent}
  })
  event_type: AuditEvent

  @Column({
    type: 'jsonb'
  })
  event_description: string[]

  @Column({ nullable: true })
  user_id: string

  @Column()
  username: string

  @Column({ nullable: true })
  user_email: string


  @Column()
  table_name: string

  @Column()
  entity_id: string

  @Column({ nullable: true })
  ip: string

  @Column({
    type: 'enum',
    enum: AuditModule,
    nullable: true
  })
  module: AuditModule

  @Column({
    type: 'jsonb',
    nullable: true
  })
  old_value: Record<string, unknown>

  @Column({
    type: 'jsonb',
    nullable: true
  })
  new_value: Record<string, unknown>
}
