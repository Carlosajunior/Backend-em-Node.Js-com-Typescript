import { RequestContext } from '@/modules/common/auth/middlewares';
import { BadRequestException, Injectable } from '@nestjs/common';
import { VacancyRepository } from '../../repositories/vacancy.repository';
import { UserRepository } from '../../../users/repositories/user.repository';
import { CreateNoteDto } from '../dto/create-note.dto';
import { NotesRepository } from '../repositories/notes.repository';

@Injectable()
export class NotesService {
  constructor(
    private readonly notesRepository: NotesRepository,
    private readonly userRepository: UserRepository,
    private readonly vacanciesRepository: VacancyRepository
  ) { }

  async create(note: CreateNoteDto) {
    const currentUser = RequestContext.currentUser();

    const vacancy = await this.vacanciesRepository.findOne({
      where: { id: note.vacancy_id },
      relations: ['customer']
    });

    if (!vacancy) {
      throw new BadRequestException('Vaga não encontrada.');
    }

    const user = await this.userRepository.findOne({
      where: {
        email: currentUser.email
      }
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    note.customer = vacancy.customer ? vacancy.customer.name : undefined;
    note.user_id = user.id;

    const createdNote = await this.notesRepository.createNote(note);

    return {
      ...createdNote,
      user: `${user.name} ${user.middle_name}`
    };
  }

  async listAllVacancyNotes(id: number) {
    const notes = await this.notesRepository.listNotesByVacancy(id);
    return notes?.map((note) => ({
      ...note,
      user: `${note.user.name} ${note.user.middle_name}`
    }));
  }

  public async remove(id: string, currentUserEmail: string) {
    const note = await this.notesRepository.findOne(id);

    const user = await this.userRepository.findOne({
      where: {
        email: currentUserEmail
      }
    });

    if (!user) {
      throw new BadRequestException('Usuário não encontrado.');
    }

    if (note.user_id !== user.id) {
      throw new BadRequestException(
        'Um usuário não pode excluir uma observação de outro usuário.'
      );
    }

    return await this.notesRepository.deleteNote(id);
  }
}
