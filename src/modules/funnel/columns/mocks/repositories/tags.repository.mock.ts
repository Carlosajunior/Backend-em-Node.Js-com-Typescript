export const mockTagsRepository = () => ({
  findTagByName: jest.fn(),
  findTagsByIds: jest.fn(),
  createTag: jest.fn(),
  findTags: jest.fn()
})
