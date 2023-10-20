import { RequestContext } from '@/modules/common/auth/middlewares';
import { User } from '@/modules/users/entities/user.entity';
import { mockUserRepository } from '@/modules/users/mocks/repositories/user-repository.mock';
import { UserRepository } from '@/modules/users/repositories/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { datatype } from 'faker';
import { mockVacancyModel } from '../../mocks/models/vacancy.model.mock';
import { mockVacancyRepository } from '../../mocks/repositories/vacancy.repository.mock';
import { VacancyRepository } from '../../repositories/vacancy.repository';
import { mockCreateNoteDTO } from '../mocks/dtos/create-note.dto.mock';
import { mockNoteModel } from '../mocks/models/note.model.mock';
import { mockNotesRepository } from '../mocks/repositories/note.repository.mock';
import { NotesRepository } from '../repositories/notes.repository';
import { NotesService } from './notes.service';

describe('NotesService', () => {
  let service: NotesService;
  let vacanciesRepository: any
  let userRepository: any
  let notesRepository: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: NotesRepository, useFactory: mockNotesRepository },
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: VacancyRepository, useFactory: mockVacancyRepository }
      ]
    }).compile();

    notesRepository = module.get<NotesRepository>(NotesRepository);
    userRepository = module.get<UserRepository>(UserRepository);
    vacanciesRepository = module.get<VacancyRepository>(VacancyRepository);
    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a note.', async () => {
    RequestContext.currentUser = jest.fn().mockResolvedValue({ email: datatype.string() })
    const vacancy = mockVacancyModel()
    vacanciesRepository.findOne = jest.fn().mockResolvedValue(vacancy)
    const user = new User()
    userRepository.findOne = jest.fn().mockResolvedValue(user)
    const note = mockNoteModel()
    notesRepository.createNote = jest.fn().mockResolvedValue(note)
    const createNoteDTO = mockCreateNoteDTO()
    const result = await service.create(createNoteDTO)
    expect(result).toEqual({
      ...note,
      user: `${user.name} ${user.middle_name}`
    })
  })

  it('should list vacancy notes.', async () => {
    const note = mockNoteModel()
    notesRepository.listNotesByVacancy = jest.fn().mockResolvedValue([note])
    const result = await service.listAllVacancyNotes(datatype.number())
    expect(result).toEqual([{
      ...note,
      user: `${note.user.name} ${note.user.middle_name}`
    }])
  })

  it('should remove a note.', async () => {
    const note = mockNoteModel()
    notesRepository.findOne = jest.fn().mockResolvedValue(note)
    const user = new User()
    user.id = note.user_id
    userRepository.findOne = jest.fn().mockResolvedValue(user)
    notesRepository.deleteNote = jest.fn().mockResolvedValue({
      "raw": [],
      "affected": 1
    })
    const result = await service.remove(datatype.string(), datatype.string())
    expect(result).toEqual({
      "raw": [],
      "affected": 1
    })
  })
});
