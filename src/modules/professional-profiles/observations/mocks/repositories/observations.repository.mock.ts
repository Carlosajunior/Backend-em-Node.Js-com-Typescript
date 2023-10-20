export const mockObservationsRepository = () => ({
  createObservationsInBulk: jest.fn(),
  insertOrDeleteObservationsInBulk: jest.fn(),
  countObservationsBColumnId: jest.fn()
})
