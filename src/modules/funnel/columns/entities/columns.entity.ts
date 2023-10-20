import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { DefaultEntity } from '@/modules/common/shared/entities'
import { ColumnsModel } from '../models'
import Funnel from '../../entities/funnel.entity'
import { Observation } from '@/modules/professional-profiles/observations/entities'

@Entity()
export class Columns extends DefaultEntity implements ColumnsModel {
  @Column()
  name: string

  @Column({ default: false })
  preinterview?: boolean

  @Column({ default: false })
  postinterview?: boolean

  @Column({ nullable: true })
  index?: number

  @ManyToOne(() => Funnel, funnel => funnel.columns)
  @JoinColumn({ name: "funnelId" })
  funnel: Funnel

  @Column({ nullable: true })
  funnelId: string

  @OneToMany(() => Observation, observation => observation.column)
  observations?: Observation[]

  total?: number

}
