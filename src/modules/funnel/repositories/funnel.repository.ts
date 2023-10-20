import { ListEntitiesModel } from '@/modules/common/shared/models';
import { PostJobInterview } from '@/modules/post-job-interview/entities/post-job-interview.entity';
import { PreJobInterview } from '@/modules/pre-job-interview/entities/pre-job-interview.entity';
import { ConflictException, NotAcceptableException } from '@nestjs/common';
import {
  Column,
  createQueryBuilder,
  EntityRepository,
  getManager,
  Repository
} from 'typeorm';
import { CreateFunnelDto } from '../dto/create-funnel.dto';
import FindFunnelDto from '../dto/list-funnel.dto';
import { UpdateFunnelDto } from '../dto/update-funnel.dto';
import Funnel from '../entities/funnel.entity';

@EntityRepository(Funnel)
export class FunnelRepository extends Repository<Funnel> {
  async countCustomers(condition?: string) {
    const count = condition
      ? await this.createQueryBuilder('Funnel').where(condition).getCount()
      : await this.createQueryBuilder('Funnel').getCount();
    return count;
  }

  async findFunnels(data: FindFunnelDto): Promise<ListEntitiesModel<Funnel>> {
    const { page, status, records_per_page, search } = data;
    let condition = `Funnel.name ilike '%${search == 'todos' ? '%' : search}%'`;
    if (status) {
      condition = `${condition} and status = '${status}'`;
    }
    const query = await createQueryBuilder<Funnel>('Funnel')
      .where(condition)
      .leftJoinAndSelect('Funnel.columns', 'columns')
      .take(records_per_page)
      .skip((page - 1) * records_per_page)
      .orderBy('Funnel.created_at', 'DESC')
      .getMany();
    const funnelsCount = await this.countCustomers(condition);

    for (const result of query) {
      result.columns.sort((a, b) => (a.index > b.index ? 1 : -1));
    }

    return {
      page,
      results: query,
      total_results_per_page: query.length,
      total_results: funnelsCount,
      total_pages: Math.ceil(funnelsCount / records_per_page)
    };
  }

  async findFunnelByIds(funnelIds: string[]): Promise<Funnel[]> {
    const promises = funnelIds.map(
      async (funnelId) => await this.findOne(funnelId)
    );
    const getFunnels = await Promise.all(promises);
    return getFunnels.filter((funnel) => Boolean(funnel));
  }

  async createFunnel(data: CreateFunnelDto) {
    const columns: Array<any> = data.columns.map((column, index) => { return { ...column, index } })
    let pre_job_columns: PreJobInterview[] = await getManager().query(
      `SELECT name FROM pre_job_interview`
    );
    pre_job_columns = pre_job_columns.map((column) => ({
      ...column,
      preinterview: true
    }));
    let post_job_columns: PostJobInterview[] = await getManager().query(
      `SELECT name FROM post_job_interview ORDER BY index ASC`
    );
    post_job_columns = post_job_columns.map((column) => ({
      ...column,
      postinterview: true
    }));
    for await (let pre_job of pre_job_columns) {
      if (columns.filter(column => column.name === pre_job.name).length == 0) {
        Object.assign(pre_job, { index: columns.length - 1 })
        columns.push(pre_job)
      }
    }
    for await (let post_job of post_job_columns) {
      if (columns.filter(column => column.name === post_job.name).length == 0) {
        Object.assign(post_job, { index: columns.length - 1 })
        columns.push(post_job)
      }
    }
    const newFunnel = this.create({ ...data, columns });
    return await this.save(newFunnel);
  }

  async createFunnelInBulk(data: CreateFunnelDto[]) {
    const created = Promise.all(
      data.map(async (funnel) => {
        const createdFunnel = this.create(funnel);
        return await this.save(createdFunnel);
      })
    );

    return created;
  }

  async updateFunnel(data: UpdateFunnelDto, currentData: Funnel) {
    try {
      if (!currentData) return;
      const isSameColumn = (a, b) => a.id === b.id;
      const onlyInLeft = (left, right = [], compareFunction) =>
        left.filter(
          (leftValue) =>
            !right.some((rightValue) => compareFunction(leftValue, rightValue))
        );
      const toRemove = onlyInLeft(
        currentData.columns,
        data.columns,
        isSameColumn
      );
      for (const column of toRemove) {
        if (column.total >= 1) {
          throw new ConflictException(
            `${column.name} não pode ser removida, pois contém candidatos em processo.`
          );
        }
      }
      for (const column of currentData?.columns || []) {
        delete column.total;
      }
      Object.entries(data).map((items) => {
        if (items[0] === 'customers') return;
        currentData[items[0]] = items[1];
      });

      await this.save(currentData);

      return currentData;
    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }
}
