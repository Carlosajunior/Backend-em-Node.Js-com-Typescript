export const mockContactRepository = () => ({
  createContact: jest.fn(),
  createContactInBulk: jest.fn(),
  remove: jest.fn()
});
