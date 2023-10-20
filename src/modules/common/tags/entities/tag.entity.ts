import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { DefaultEntity } from '@/modules/common/shared/entities';
import { User } from '@/modules/users/entities/user.entity';
import { TagCategories } from '../constants/tag-categories.constants';
import { TagsToProfile } from './tags-to-profile.entity';

@Entity()
export class Tag extends DefaultEntity {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'enum', enum: TagCategories, nullable: true })
  category: TagCategories;

  @Column({ type: 'boolean', default: false })
  to_approve: boolean;

  @Column({ nullable: true })
  approved_by?: string;

  @Column({ nullable: true })
  approver_id?: string;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'approver_id' })
  approver: User;

  @OneToMany(() => TagsToProfile, (tagsToProfile) => tagsToProfile.tag)
  tags_profile: TagsToProfile[];
}
