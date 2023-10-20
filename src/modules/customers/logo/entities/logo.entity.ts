import { DefaultEntity } from '@/modules/common/shared/entities';
import { Column, Entity } from 'typeorm';
import { LogoModel } from '../model/logo.model';

@Entity()
export default class Logo extends DefaultEntity implements LogoModel {
  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar' })
  url: string;
}
