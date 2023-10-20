export const mockVacancyRepository = () => ({
  paginateByParams: jest.fn(),
  paginateBySearch: jest.fn(),
  queryBuilder: jest.fn()
});
