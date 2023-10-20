export const mockCustomerRepository = () => ({
  createCustomer: jest.fn(),
  listCustomersByQuery: jest.fn(),
  findExistingCustomerByFields: jest.fn(),
  findCustomerByIds: jest.fn(),
  updateCustomer: jest.fn(),
  update: jest.fn(),
  findOne: jest.fn()
});
