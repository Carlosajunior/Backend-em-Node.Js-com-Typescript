/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { AuditEvent, AuditModule } from '@/modules/audit/constants'
import { RequestContext } from '@/modules/common/auth/middlewares'
import { Note } from '@/modules/vacancies/notes/entities/note.entity'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, EntitySubscriberInterface, InsertEvent, RemoveEvent } from 'typeorm'
import { handlAuditEvent } from '../helpers'
import { AuditRepository } from '../repositories'

@Injectable()
export class NoteSubscriber implements EntitySubscriberInterface<Note> {
  constructor (
    @InjectConnection() readonly connection: Connection,
    private readonly auditRepository: AuditRepository,
  ) {
    connection.subscribers.push(this)
  }

  listenTo (): any {
    return Note
  }

  async afterInsert (event: InsertEvent<Note>): Promise<void | Promise<any>> {
    handlAuditEvent(
      event.entity.vacancy_id.toString(),
      AuditEvent.Update,
      `Adicionada observação`,
      `"${event.entity.notes}"`,
      'vacancies',
      AuditModule.Vacancy
    )
  }

  async beforeRemove(event: RemoveEvent<Note>): Promise<void | Promise<any>> {
    const note_id = RequestContext.currentRequest().params.id
    const note = await event.queryRunner.query(`SELECT notes, vacancy_id FROM note WHERE id = $1`, [note_id])
    
    handlAuditEvent(
      note[0].vacancy_id,
      AuditEvent.Update,
      `Removida observação`,
      `"${note[0].notes}"`,
      'vacancies',
      AuditModule.Vacancy
    )

    const profile_history = RequestContext.currentProfileHistory()
    if (profile_history) {
      this.auditRepository.createAudit(profile_history)
    }
  }
}
