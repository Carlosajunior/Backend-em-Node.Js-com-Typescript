export const mockColumnsRepository = () => ({
  countTags: jest.fn(),
  createColumnsInBulk: jest.fn(),
  findColumnsByFunnel: jest.fn(),
  findTagsByIds: jest.fn(),
  createTag: jest.fn(),
  deleteById: jest.fn()
})
