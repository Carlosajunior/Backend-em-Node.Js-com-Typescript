export const mockLanguagesRepository = () => ({
  findLangByName: jest.fn(),
  findLangByIds: jest.fn(),
  createLang: jest.fn()
})
