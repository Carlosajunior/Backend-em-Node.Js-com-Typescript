import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException
} from '@nestjs/common';
import { RequestContext } from '../../common/auth/middlewares/request.context';
import { ListEntitiesModel } from '../../common/shared/models';
import { ObservationsRepository } from '../../professional-profiles/observations/repositories';
import { UserRepository } from '../../users/repositories/user.repository';
import { AccessProfiles } from '../../common/shared/constants/access-profiles';
import { FunnelConstants } from '../constants';
import { CreateFunnelDto } from '../dto/create-funnel.dto';
import FindFunnelDto from '../dto/list-funnel.dto';
import { UpdateFunnelDto } from '../dto/update-funnel.dto';
import Funnel from '../entities/funnel.entity';
import { FunnelRepository } from '../repositories/funnel.repository';

@Injectable()
export class FunnelService {
  constructor(
    private readonly funnelRepository: FunnelRepository,
    private readonly observationsRepository: ObservationsRepository,
    private readonly userRepository: UserRepository
  ) { }

  async create(createFunnelDto: CreateFunnelDto) {
    const { name, middle_name, id, email } = RequestContext.currentUser();

    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new BadRequestException('Usuário não foi encontrado.');
    }

    createFunnelDto.creator_id = user.id;

    const sender_name = `${name} ${middle_name}`
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    createFunnelDto.created_by = sender_name;

    createFunnelDto.username_id = id;

    const createdFunnel = await this.funnelRepository.createFunnel(
      createFunnelDto
    );

    return createdFunnel;
  }

  async list({
    page = 1,
    status = FunnelConstants.All,
    records_per_page = 15,
    search = ''
  }: FindFunnelDto): Promise<ListEntitiesModel<Funnel>> {
    return await this.funnelRepository.findFunnels({
      page,
      status,
      records_per_page,
      search
    });
  }

  async update(
    id: string,
    updateFunnelDto: UpdateFunnelDto,
    accessLevel: Array<AccessProfiles>
  ) {
    const funnelRecorded = await this.funnelRepository.findOne(id);

    if (!funnelRecorded) {
      throw new BadRequestException('Funil não foi encontrado.');
    }

    const { email } = RequestContext.currentUser();

    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new BadRequestException('Usuário não foi encontrado.');
    }

    if (accessLevel.includes(AccessProfiles.COMMERCIAL)) {
      if (user.id !== funnelRecorded.creator_id) {
        throw new NotAcceptableException();
      }
    }
    const currentFunnel = await this.funnelRepository.findOne({
      where: id,
      relations: ['columns']
    });

    for (const column of currentFunnel?.columns || []) {
      const total_of_candidates_in_column =
        await this.observationsRepository.countObservationsBColumnId(column.id);
      column.total = total_of_candidates_in_column;
    }
    const funnel = await this.funnelRepository.updateFunnel(
      updateFunnelDto,
      currentFunnel
    );
    return funnel;
  }

  async updateStatus(id: string, status: FunnelConstants) {
    const toUpdate = await this.funnelRepository.findOne({ id });
    const changeStatus = await this.funnelRepository.update(id, {
      status: status || toUpdate.status
    });
    if (changeStatus.affected !== 1) {
      throw new NotFoundException('Update failed, funnel not found.');
    } else {
      return { ...toUpdate, status };
    }
  }
}
