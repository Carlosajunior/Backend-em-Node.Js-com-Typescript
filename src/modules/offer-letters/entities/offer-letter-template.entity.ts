import { DefaultEntity } from '@/modules/common/shared/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TemplateStatus } from '../constants/template-status.constant';
import { TypeOfContract } from '../constants/type-of-contract.constant';

@Entity({
  name: 'offer_letters_templates'
})
export class OfferLetterTemplate extends DefaultEntity {
  @Column({ default: TemplateStatus.ACTIVE, enum: TemplateStatus })
  status: TemplateStatus;

  @Column({ type: 'text' })
  text: string;

  @Column()
  title: string;

  @Column({ enum: TypeOfContract })
  type_of_contract: TypeOfContract;

  @Column()
  user_id: string;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
