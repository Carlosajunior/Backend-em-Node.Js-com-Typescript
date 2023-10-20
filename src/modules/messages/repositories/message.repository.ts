import { RequestContext } from '@/modules/common/auth/middlewares';
import { ListEntitiesModel } from '@/modules/common/shared/models';
import { MessageDTO, SearchDTO } from '@/modules/messages/dtos';
import { Message } from '@/modules/messages/entities';
import { ProfileModel } from '@/modules/professional-profiles/profiles/models';
import { NotFoundException } from '@nestjs/common';
import { isNumberString } from 'class-validator';
import { createQueryBuilder, EntityRepository, Repository } from 'typeorm';
import { textSearchByFields } from 'typeorm-text-search';
import { MessagesToProfile } from '../entities/message-to-profile.entity';

@EntityRepository(Message)
export class MessagesRepository extends Repository<Message> {

  async createMessage(data: MessageDTO): Promise<Message> {
    const message = this.create(data);
    return this.save(message);
  }

  async paginateBySearch({
    page = 1,
    records_per_page = 15,
    search = '',
  }: SearchDTO) {
    let last_page = (page - 1) * records_per_page > 0 ? page - 1 : null
    const messages = await createQueryBuilder<Message>('Message')
      .leftJoin('Message.vacancies', 'vacancy')
      .orderBy('Message.created_at', 'DESC')
    textSearchByFields<Message>(messages, search, [
      'Message.title',
      'vacancy.title',
      'Message.sms_title',
      'Message.sender_name',
    ]);
    const messageCount = await messages.getCount()
    messages.take(records_per_page)
    messages.skip((page - 1) * records_per_page)

    const results = await messages.getMany()

    return {
      page,
      last_page,
      results,
      total_results_per_page: records_per_page,
      total_results: messageCount,
      total_pages: Math.ceil(messageCount / records_per_page)
    };
  }

  async paginateByParams({
    page = 1,
    records_per_page = 15,
    user_email,
    professional_id,
    vacancy_id,
    date_start,
    date_end
  }: SearchDTO) {
    let last_page = (page - 1) * records_per_page > 0 ? page - 1 : null

    const messages = await createQueryBuilder<Message>('Message')
      .leftJoin('Message.vacancies', 'vacancy')
      .leftJoin('Message.messages_profile', 'messages_profile')
      .leftJoin('messages_profile.profile', 'profile')
      .andWhere('profile.active = true')
      .orderBy('Message.created_at', 'DESC')
    if (user_email) {
      messages.andWhere('Message.sender_email = :email ', { email: user_email })
    }

    if (professional_id) {
      messages.andWhere('profile.id = :profile_id ', { profile_id: professional_id })
    }

    if (vacancy_id) {
      messages.andWhere('vacancy.id = :vacancy_id ', { vacancy_id: Number(vacancy_id) })
    }

    if (date_start && date_end) {
      messages.andWhere(
        `CAST(Message.created_at AS DATE) between '${date_start}' and '${date_end}'`
      );
    }

    const messageCount = await messages.getCount()
    messages.take(records_per_page)
    messages.skip((page - 1) * records_per_page)
    const results = await messages.getMany()

    return {
      page,
      last_page,
      results,
      total_results_per_page: records_per_page,
      total_results: messageCount,
      total_pages: Math.ceil(messageCount / records_per_page)
    };
  }


  async findMessages(query: SearchDTO, headers: Array<string>) {
    try {
      const { page, records_per_page, search } = query;
      let last_page = (page - 1) * records_per_page > 0 ? page - 1 : null


      const messages = await this.createQueryBuilder('message')
        .leftJoinAndSelect('message.vacancies', 'vacancy')
        // .leftJoinAndSelect('message.messages_profile', 'messages_profile')
        // .leftJoinAndSelect('messages_profile.profile', 'profile')
        // .leftJoinAndSelect('profile.tags', 'profile_tag')
        // .leftJoinAndSelect('profile_tag.tag', 'tag')
        .orWhere('message.title ilike :title', { title: `%${search}%` })
        .orWhere('vacancy.title ilike :vacancyTitle', { vacancyTitle: `%${search}%` })
        .orWhere('message.sms_title ilike :sms_title', { sms_title: `%${search}%` })
        .orWhere('message.title ilike :email_title', { email_title: `%${search}%` })
        .orWhere('message.sender_name ilike :sender_name', { sender_name: `%${search}%` })
      if (isNumberString(search)) {
        messages.orWhere('message.vacancy_id = :vacancy_id', { vacancy_id: Number(search) })
      }
      if ((query.date_start != null && query.date_start != undefined) && (query.date_end != null && query.date_end != undefined)) {
        messages.andWhere(`CAST(message.created_at AS DATE) between '${query.date_start}' and '${query.date_end}'`)
      }
      if (headers.includes("Administrador")) {
        messages.orWhere('message.sender_name ilike :sender_name', { sender_name: `%${search}%` })
      }
      if (!headers.includes("Administrador")) {
        const { name, middle_name } = RequestContext.currentUser();
        const sender_name = `${name} ${middle_name}`
          ?.normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
        messages.orWhere('message.sender_name ilike :sender_name', { sender_name: `%${search}%` })
      }
      messages.orderBy('message.created_at', 'DESC')

      const messageCount = await messages.getCount()
      messages.take(records_per_page)
      messages.skip((page - 1) * records_per_page)
      const results = await messages.getMany()

      return {
        page,
        last_page,
        results,
        total_results_per_page: records_per_page,
        total_results: messageCount,
        total_pages: Math.ceil(messageCount / records_per_page)
      };

    } catch (error) {
      console.log(error)
      return new NotFoundException(error)
    }
  }

  async findRecipientsByMessageId(id: string, query: SearchDTO): Promise<ListEntitiesModel<ProfileModel>> {
    const { page, records_per_page, search } = query;
    let last_page = (page - 1) * records_per_page > 0 ? page - 1 : null

    const professionals = createQueryBuilder<MessagesToProfile>('MessagesToProfile')
      .leftJoinAndSelect('MessagesToProfile.profile', 'profile')
      .where('MessagesToProfile.message_id = :id', { id })
      .andWhere('profile.active = true')
      .orderBy('MessagesToProfile.created_at', 'DESC')

    textSearchByFields<MessagesToProfile>(professionals, search, [
      'profile.name',
    ]);

    const professionalCount = await professionals.getCount()
    professionals.take(records_per_page)
    professionals.skip((page - 1) * records_per_page)

    const results = await professionals.getMany()

    return {
      page,
      last_page,
      results: results.map((result) => result.profile),
      total_results_per_page: records_per_page,
      total_results: professionalCount,
      total_pages: Math.ceil(professionalCount / records_per_page)
    };

  }
}
