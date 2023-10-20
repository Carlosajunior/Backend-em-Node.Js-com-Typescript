export const mockFunnelRepository = () => ({
  createFunnel: jest.fn(),
  createFunnelInBulk: jest.fn(),
  updateFunnel: jest.fn(),
  findFunnelByIds: jest.fn()
});
