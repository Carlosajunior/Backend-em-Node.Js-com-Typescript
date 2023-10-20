import { RequestContext } from '@/modules/common/auth/middlewares';
import { ListEntitiesModel } from '@/modules/common/shared/models';
import { MessageType } from '@/modules/messages/dtos';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { UpdateResult } from 'typeorm';
import { TemplateStatus } from '../constants/template-status.constant';
import { TemplateDTO } from '../dtos';
import { QueryParams } from '../dtos/query-params.dto';
import { Template } from '../entities';
import { TemplateRepository } from '../repositories/template.repository';

@Injectable()
export class TemplatesService {
  constructor(
    private readonly templatesRepository: TemplateRepository,
    private readonly userRepository: UserRepository
  ) { }

  async create(data: TemplateDTO) {
    if (data.type === MessageType.Email) {
      if (!data?.email_title) {
        throw new Error('É necessário informar o título do e-mail');
      }
    }

    const { name, middle_name, email } = RequestContext.currentUser();
    const sender_name = `${name} ${middle_name}`
      ?.normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    data.created_by = sender_name;

    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    data.username_id = user.id;
    data.creator_id = user.id;
    data.status = TemplateStatus.ACTIVE;

    return await this.templatesRepository.createTemplate(data);
  }

  async update(id: string, data: TemplateDTO) {
    if (data.type === MessageType.Email) {
      if (!data?.email_title) {
        throw new Error('É necessário informar o título do e-mail');
      }
    }

    return await this.templatesRepository.updateTemplate(id, data);
  }

  async changeStatus(id: string): Promise<Template> {
    const toUpdate = await this.templatesRepository.findOne({ id });

    if (!toUpdate)
      throw new NotFoundException('Update failed, template not found.');

    if (toUpdate.status === TemplateStatus.DELETED)
      throw new NotFoundException('Template is deleted.');

    const updatedColumns = {
      active: !toUpdate?.active,
      status: toUpdate?.active ? TemplateStatus.INACTIVE : TemplateStatus.ACTIVE
    };

    const changeStatus = await this.templatesRepository.update(
      id,
      updatedColumns
    );

    if (changeStatus.affected !== 1) {
      throw new NotFoundException('Update failed, template not found.');
    }

    return { ...toUpdate, ...updatedColumns };
  }

  public async deleteTemplate(id: string): Promise<UpdateResult> {
    if (!isUUID(id)) {
      throw new NotFoundException('Template not found.');
    }

    const template = await this.templatesRepository.findOne({ where: { id } });

    if (template.status === TemplateStatus.DELETED) {
      throw new NotFoundException('Template already deleted');
    }

    return await this.templatesRepository.update(id, {
      active: false,
      status: TemplateStatus.DELETED
    });
  }

  async list({
    page = 1,
    records_per_page: recordsPerPage = 15,
    search = '',
    type = '',
    active
  }: QueryParams): Promise<ListEntitiesModel<Template>> {
    try {
      return await this.templatesRepository.findTemplates({
        page,
        records_per_page: recordsPerPage,
        search,
        type,
        active
      });
    } catch (error) {
      throw new NotFoundException(error)
    }
  }
}
