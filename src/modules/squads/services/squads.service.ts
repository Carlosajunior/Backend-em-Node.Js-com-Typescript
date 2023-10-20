import { BooleanStatus } from '@/modules/professional-profiles/profiles/contansts';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ILike } from 'typeorm';
import { listSquadMembersDTO } from '../dtos/list-members-squad.dto';
import { ListSquadsDTO } from '../dtos/list-squads.dto';
import { UpdateSquadDTO } from '../dtos/update-squad.dto';
import { Squad } from '../entities/squad.entity';
import { SquadRepository } from '../repositories/squad.repository';

@Injectable()
export class SquadsService {
  constructor(
    private readonly squadRepository: SquadRepository,
    private readonly usersRepository: UserRepository
  ) { }

  async listSquadsSearch(data: ListSquadsDTO) {
    let last_page = (data.page - 1) * data.records_per_page > 0 ? data.page - 1 : null
    let squads = await this.squadRepository.find({
      where: {
        name: ILike(`%${data.search}%`)
      },
      take: data.records_per_page ? data.records_per_page : 15,
      skip: data.page ? ((data.page - 1) * data.records_per_page) : null
    });
    await squads.flatMap(async (squad) => {
      const members_quantity = await this.usersRepository.count({
        where: {
          squad_id: squad.id
        }
      })
      return Object.assign(squad, squad, members_quantity)
    })
    return {
      results: squads,
      page: data.page,
      last_page,
      total_results: squads.length,
      total_pages: Math.ceil(squads.length / (data.records_per_page ? data.records_per_page : 5))

    }
  }

  async listSquadMembers(data: listSquadMembersDTO) {
    let last_page = (data.page - 1) * data.records_per_page > 0 ? data.page - 1 : null
    let members = await this.usersRepository.findAndCount({
      where: [
        { squad_id: data.squad_id, name: ILike(`%${data.search}%`) },
        { squad_id: data.squad_id, middle_name: ILike(`%${data.search}%`) },
        { squad_id: data.squad_id, position: ILike(`%${data.search}%`) },
        { squad_id: data.squad_id, whatsapp_business: ILike(`%${data.search}%`) },
        { squad_id: data.squad_id, email: ILike(`%${data.search}%`) },
      ]
    })
    return {
      results: members[0],
      page: data.page,
      last_page,
      total_results: members[1],
      total_pages: Math.ceil(members[1] / (data.records_per_page ? data.records_per_page : 5))

    }

  }

  async updateSquad(data: UpdateSquadDTO) {
    if (data.is_active && data.is_active == BooleanStatus.False) {
      const numberOfUsers = await this.usersRepository.count({
        where: {
          squad_id: data.id
        }
      })
      if (numberOfUsers > 0) {
        throw new NotAcceptableException()
      }
    }
    return await this.squadRepository.update({ id: data.id }, { is_active: data.is_active == BooleanStatus.False ? false : true, name: data.name })
  }

  async listSquads(): Promise<Squad[]> {
    return await this.squadRepository.find({
      where: {
        is_active: true
      }
    });
  }

}
