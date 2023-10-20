export const mockTagsRepository = () => ({
  countTags: jest.fn(),
  findTags: jest.fn(),
  findTagByName: jest.fn(),
  findTagsByIds: jest.fn().mockReturnValue([]),
  createTag: jest.fn(),
  updateTag: jest.fn(),
  find: jest.fn().mockReturnValue([])
})
