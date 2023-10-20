export const mockProfilesRepository = () => ({
  findProfileByEmail: jest.fn(),
  findLastProfile: jest.fn(),
  createProfile: jest.fn(),
  updateProfileId: jest.fn(),
  findProfileByNameAndCpf: jest.fn(),
  deleteBehavioralProfileFieldInfo: jest.fn(),
  countProfileByIdentify: jest.fn(),
  updateProfile: jest.fn(),
  findOne: jest.fn()
})