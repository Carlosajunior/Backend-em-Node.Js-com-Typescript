import { ListEntitiesModel } from '@/modules/common/shared/models';
import { EntityRepository, Repository } from 'typeorm';
import { ListUsersDTO } from '../dtos/list-users.dto';
import { User } from '../entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findOne({
      where: {
        email
      }
    });

    return !!user;
  }

  public async paginate({
    is_active = true,
    page = 1,
    records_per_page = 15
  }: ListUsersDTO): Promise<ListEntitiesModel<User>> {
    const users = await this.find({
      where: {
        is_active
      },
      order: {
        name: 'ASC'
      },
      relations: ['squad'],
      skip: (page - 1) * records_per_page,
      take: records_per_page
    });

    const total_results = await this.count({
      where: {
        is_active
      }
    });

    const total_pages = Math.ceil(Number(total_results) / records_per_page);

    return {
      page,
      results: users?.map((user) => UserMapper.toMap(user)) || [],
      total_results_per_page: records_per_page,
      total_results,
      total_pages
    };
  }
}
