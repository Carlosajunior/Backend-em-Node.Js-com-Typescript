import { Column, Entity, Generated, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Categories } from '@/modules/categories/entities';
import { DefaultEntity } from '@/modules/common/shared/entities';
import { TagsToProfile } from '@/modules/common/tags/entities';
import { MessagesToProfile } from '@/modules/messages/entities/message-to-profile.entity';
import { Attachment } from '@/modules/professional-profiles/attachments/entities';
import { Experience } from '@/modules/professional-profiles/experiences/entities';
import { Formation } from '@/modules/professional-profiles/formations/entities';
import { Language } from '@/modules/professional-profiles/languages/entities';
import { BooleanStatus, ProfileAcceptContract, ProfileGender, ProfileStatus } from '@/modules/professional-profiles/profiles/contansts';
import { ProfileModel } from '@/modules/professional-profiles/profiles/models';
import { Reference } from '@/modules/professional-profiles/references/entities';
import { SocialMedia } from '@/modules/professional-profiles/social-medias/entities';
import { User } from '@/modules/users/entities/user.entity';
import { Observation } from '../../observations/entities';
import { ProfileOrigin } from '../contansts/profile-origin.constant';
import { Address } from '../../address/entities/address.entity';

@Entity()
export class Profile extends DefaultEntity implements ProfileModel {
  @Column()
  @Generated('increment')
  identify_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: true, type: 'date' })
  birthdate: Date;

  @Column({ nullable: true })
  mother_name: string;

  @Column({
    type: 'enum',
    enum: ProfileGender,
    nullable: true
  })
  gender: ProfileGender;

  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({
    type: 'enum',
    enum: ProfileAcceptContract,
    nullable: true
  })
  accept_contract: ProfileAcceptContract;

  @Column({ nullable: true })
  clt_claim: number;

  @Column({ nullable: true })
  pj_claim: number;

  @Column()
  professional_title?: string;

  @Column({ nullable: true })
  professional_about: string;

  @Column({ nullable: true })
  quati_result: string;

  @Column({ nullable: true })
  disc2_result: string;

  @Column({
    type: 'enum',
    enum: BooleanStatus,
    nullable: true
  })
  homeoffice: BooleanStatus;

  @Column({
    type: 'enum',
    enum: BooleanStatus,
    default: BooleanStatus.False
  })
  uds: BooleanStatus;

  @Column({
    type: 'enum',
    enum: BooleanStatus,
    default: BooleanStatus.False
  })
  impedido: BooleanStatus;

  @Column({ nullable: true })
  created_by: string;

  @Column({ nullable: true })
  updated_by: string;

  @Column({ nullable: true })
  alocated_by: string;

  @Column({
    type: 'enum',
    enum: ProfileStatus,
    nullable: true
  })
  status: string;

  @Column({
    type: 'enum',
    enum: ProfileOrigin,
    nullable: true
  })
  origin: string;

  @Column({ nullable: true })
  username_id: string;

  @Column({ nullable: true, type: 'timestamp' })
  extration_ref?: Date;

  @OneToMany(() => TagsToProfile, (TagsToProfile) => TagsToProfile.profile)
  tags?: TagsToProfile[];

  @Column({ nullable: true })
  identify: string;

  @Column({ nullable: true })
  photo_url: string;

  @Column({
    type: 'enum',
    enum: BooleanStatus,
    default: BooleanStatus.False
  })
  open_to_work: BooleanStatus;

  @Column({
    type: 'enum',
    enum: BooleanStatus,
    default: BooleanStatus.False
  })
  verified: BooleanStatus;

  @OneToMany(() => Attachment, (attachment) => attachment.profile)
  attachments: Attachment[];

  @OneToMany(() => Experience, (experience) => experience.profile)
  experiences: Experience[];

  @OneToMany(() => Formation, (formation) => formation.profile)
  formations: Formation[];

  @OneToMany(() => Language, (language) => language.profile)
  languages: Language[];

  @OneToMany(() => Reference, (reference) => reference.profile)
  references: Reference[];

  @OneToMany(() => SocialMedia, (social_media) => social_media.profile)
  social_medias: SocialMedia[];

  @OneToMany(() => Observation, (observation) => observation.profile)
  observations: Observation[];

  @OneToMany(
    () => MessagesToProfile,
    (MessagesToProfile) => MessagesToProfile.profile
  )
  messages?: MessagesToProfile[];

  @ManyToOne(() => Categories, (categories) => categories.id, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'category_id' })
  category: Categories;

  @Column({ nullable: true })
  category_id: number;

  @Column({ nullable: true })
  creator_id: string;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'username_id', referencedColumnName: 'id' })
  creator: User;

  @Column({ nullable: true })
  updater_id: string;

  @ManyToOne(() => User, (User) => User.id, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL'
  })
  @JoinColumn({ name: 'updater_id', referencedColumnName: 'id' })
  updater: User;

  @Column()
  address_id: string

  @OneToOne(() => Address, (address) => address.id)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id' })
  address: Address

  @Column()
  active: boolean
}
