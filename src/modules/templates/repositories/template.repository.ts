import { ListEntitiesModel } from '@/modules/common/shared/models';
import { NotFoundException } from '@nestjs/common';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { textSearchByFields } from 'typeorm-text-search';
import { TemplateDTO } from '../dtos';
import { QueryParams } from '../dtos/query-params.dto';
import { Template } from '../entities';

@EntityRepository(Template)
export class TemplateRepository extends Repository<Template> {
  async createTemplate(data: TemplateDTO): Promise<Template> {
    const template = this.create(data);
    return this.save(template);
  }

  async updateTemplate(id: string, data: TemplateDTO): Promise<Template> {
    const template = await this.update(id, data);
    if (template.affected !== 1) {
      throw new NotFoundException('Update failed, template not found.');
    } else {
      const updatedTemplate = await this.findOne(id);
      return updatedTemplate;
    }
  }

  async findTemplates(
    query: QueryParams
  ): Promise<ListEntitiesModel<Template>> {
    const { page, records_per_page, search, type, active } = query;
    let last_page = (page - 1) * records_per_page > 0 ? page - 1 : 0
    const templates = createQueryBuilder<Template>('Template')
      .orderBy('Template.created_at', 'DESC')
      .andWhere("Template.status <> 'DELETED'");
    textSearchByFields<Template>(templates, search, ['Template.title']);

    templates.andWhere(`Template.type ilike '%${type}%'`);

    if (active !== undefined && active !== null) {
      templates.andWhere('Template.active = :active', { active });
    }

    const templateCount = await templates.getCount();
    templates.take(records_per_page);
    templates.skip((page - 1) * records_per_page);

    const results = await templates.getMany();

    return {
      page,
      last_page,
      results,
      total_results_per_page: records_per_page,
      total_results: templateCount,
      total_pages: Math.ceil(templateCount / records_per_page)
    };
  }
}
