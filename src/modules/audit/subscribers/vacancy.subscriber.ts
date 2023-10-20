/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { RequestContext } from '@/modules/common/auth/middlewares';
import { Vacancy } from '@/modules/vacancies/entities/vacancy.entity';
import { ExtractTagsJob } from '@/modules/vacancies/queues/jobs/extract-tags.job';
import { handleVacancyCandidates } from '@/modules/vacancies/queues/jobs/handle-vacancy-candidates';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { AuditEvent, AuditModule, VacancyFields } from '../constants';
import { getVacancyColumnName } from '../helpers';

@Injectable()
export class VacanciesSubscriber implements EntitySubscriberInterface<Vacancy> {
  constructor(
    @InjectConnection() readonly connection: Connection,
    private readonly extractTagsJob: ExtractTagsJob
  ) {
    connection.subscribers.push(this);
  }

  listenTo(): any {
    return Vacancy;
  }

  async afterUpdate(event: UpdateEvent<Vacancy>): Promise<void | Promise<any>> {
    const messages = [];
    const old_value = {};
    const new_value = {};
    const currentUser = RequestContext.currentUser();
    event.updatedColumns.forEach((value) => {
      old_value[value.propertyName] = event.databaseEntity[value.propertyName];
      new_value[value.propertyName] = event.entity[value.propertyName];

      if (
        event.databaseEntity[value.propertyName] !==
        event.entity[value.propertyName]
      ) {
        if (
          event.databaseEntity[value.propertyName] === null ||
          (event.databaseEntity[value.propertyName] === '' &&
            event.entity[value.propertyName])
        ) {
          messages.push(
            `Adicionado ${getVacancyColumnName(
              value.propertyName as VacancyFields
            )}: "${event.entity[value.propertyName]}"`
          );
        }

        if (
          event.entity[value.propertyName] === null &&
          event.databaseEntity[value.propertyName]
        ) {
          messages.push(
            `Removido "${
              event.databaseEntity[value.propertyName]
            }" do campo ${getVacancyColumnName(
              value.propertyName as VacancyFields
            )}`
          );
        }

        if (
          event.databaseEntity[value.propertyName] &&
          event.databaseEntity[value.propertyName] !== null &&
          event.entity[value.propertyName] !== null
        ) {
          messages.push(
            `Campo ${getVacancyColumnName(
              value.propertyName as VacancyFields
            )} alterado de "${
              event.databaseEntity[value.propertyName]
            }" para "${event.entity[value.propertyName]}"`
          );
        }
      }
    });

    if (event.updatedColumns.length > 0) {
      RequestContext.setEvent({
        user_id: currentUser.id,
        username: `${currentUser.name} ${currentUser.middle_name}`,
        user_email: currentUser.email,
        event_type: AuditEvent.Update,
        event_description: messages,
        table_name: event.metadata.tableName,
        entity_id: String(event.entity.id),
        module: AuditModule.Vacancy,
        ip: currentUser.ip,
        old_value,
        new_value
      });
    }
  }

  async afterInsert(event: InsertEvent<Vacancy>): Promise<void | Promise<any>> {
    const currentUser = RequestContext.currentUser();
    RequestContext.setEvent({
      user_id: currentUser.id,
      username: `${currentUser.name} ${currentUser.middle_name}`,
      user_email: currentUser.email,
      event_type: AuditEvent.Insert,
      event_description: ['Cadastrada vaga'],
      table_name: event.metadata.tableName,
      entity_id: String(event.entity.id),
      module: AuditModule.Vacancy,
      ip: currentUser.ip,
      old_value: null,
      new_value: event.entity as unknown as Record<string, unknown>
    });

    handleVacancyCandidates(event.entity);
    // this.extractTagsJob.execute({ ...event.entity, run_next_job: true });
  }
}
