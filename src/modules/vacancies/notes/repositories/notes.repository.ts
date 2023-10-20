import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateNoteDto } from '../dto/create-note.dto';
import { Note } from '../entities/note.entity';

@EntityRepository(Note)
export class NotesRepository extends Repository<Note> {
  async createNote(data: CreateNoteDto): Promise<Note> {
    const createdNote = this.create(data);
    return await this.save(createdNote);
  }

  async listNotesByVacancy(vacancy_id: number) {
    return await this.find({ where: { vacancy_id }, relations: ['user'] });
  }

  async deleteNote(id: string): Promise<DeleteResult> {
    return await this.delete(id);
  }
}
