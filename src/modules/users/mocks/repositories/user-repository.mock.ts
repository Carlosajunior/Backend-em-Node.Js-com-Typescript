export const mockUserRepository = () => ({
    existsByEmail: jest.fn().mockResolvedValue(false)
});
