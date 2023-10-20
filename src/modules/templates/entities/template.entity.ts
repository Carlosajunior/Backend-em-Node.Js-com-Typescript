import { DefaultEntity } from '@/modules/common/shared/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TemplateStatus } from '../constants/template-status.constant';

@Entity()
export class Template extends DefaultEntity {
  @Column()
  title: string;

  @Column({ type: 'varchar', nullable: true })
  type: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  username_id: string;

  @Column({ nullable: true, default: true })
  active: boolean;

  @Column({ default: TemplateStatus.ACTIVE })
  status: TemplateStatus;

  @Column({ nullable: true, default: null })
  email_title: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  vacancy_url_text: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  whatsapp_text_of_recruiter: string;

  @Column({ nullable: true })
  creator_id: string;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;
}
