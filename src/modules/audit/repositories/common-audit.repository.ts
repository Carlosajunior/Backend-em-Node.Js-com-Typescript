import { CreateAuditDTO, GetAuditDTO } from '@/modules/audit/dtos';
import { Audit } from '@/modules/audit/entities';
import { ListEntitiesModel } from '@/modules/common/shared/models';
import { NotAcceptableException } from '@nestjs/common';
import { createQueryBuilder, EntityRepository, IsNull, Repository } from 'typeorm';
import { AuditEvent } from '../constants';
import { GetAuditByIdDTO } from '../dtos/get-audit-by-id.dto';

@EntityRepository(Audit)
export class AuditRepository extends Repository<Audit> {
  async createAudit(data: CreateAuditDTO): Promise<Audit> {
    try {
      const audit = this.create(data);
      return await this.save(audit);
    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }

  async updateCreatorId() {
    try {
      const audits = await this.find({
        where: {
          creator_id: IsNull()
        }
      })
      return audits
    } catch (error) {
      throw new NotAcceptableException(error)
    }
  }

  async findByID(data: GetAuditByIdDTO): Promise<ListEntitiesModel<Audit>> {
    let last_page: number;
    if (data.page) {
      if ((data.page - 1) * data.records_per_page > 0) {
        last_page = data.page - 1;
      }
    }
    const audits = await this.findAndCount({
      order: {
        created_at: 'DESC'
      },
      where: {
        entity_id: data.entity_id
      },
      take: data.records_per_page ? data.records_per_page : 5,
      skip: data.page ? (data.page - 1) * data.records_per_page : null
    });
    return {
      results: audits[0],
      page: data.page,
      last_page: last_page,
      total_results_per_page: data.records_per_page ? data.records_per_page : 5,
      total_results: audits[1],
      total_pages: Math.ceil(
        audits[1] / (data.records_per_page ? data.records_per_page : 5)
      )
    };
  }

  async findAudit(query: GetAuditDTO): Promise<ListEntitiesModel<Audit>> {
    const { records_per_page, page } = query;
    let last_page = (page - 1) * records_per_page > 0 ? page - 1 : null

    const audit = await createQueryBuilder<Audit>('Audit').addOrderBy(
      'Audit.created_at',
      'ASC'
    );
    if (query.module) {
      audit.andWhere(`Audit.module = '${query.module}'`);
    }

    if (query.date_option === 'between') {
      if (query.date_start && query.date_end) {
        audit.andWhere(
          `CAST(Audit.created_at AS DATE) between '${query.date_start}' and '${query.date_end}'`
        );
      }
    }

    if (query.user) {
      audit.andWhere(`Audit.creator_id = '${query.user}'`);
    }

    const auditCount = await audit.getCount();
    audit.take(records_per_page);
    audit.skip((page - 1) * records_per_page);

    const auditSelection = await audit.getMany();
    return {
      page,
      last_page,
      results: query.records_per_page !== 0 ? auditSelection : [],
      total_results_per_page: auditSelection.length,
      total_results: auditCount,
      total_pages: Math.ceil(auditCount / records_per_page)
    };
  }

  async findCreatedVacancy(idVacancy: number) {
    return await createQueryBuilder<Audit>('Audit')
      .where('Audit.entity_id = :id', { id: String(idVacancy) })
      .andWhere('Audit.event_type = :event', { event: AuditEvent.Insert })
      .getOne();
  }
}
