export const mockNotesRepository = () => ({
  createNote: jest.fn(),
  listNotesByVacancy: jest.fn(),
  deleteNote: jest.fn()
})
