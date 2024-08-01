import { LoginUniquesService } from 'services/LoginUniques.Service';

describe('LoginUniquesService', () => {
    let loginUniquesService: LoginUniquesService;
    let loginExistsSpy: jest.SpyInstance<Promise<boolean>>;

    beforeEach(() => {
        loginUniquesService = new LoginUniquesService();
        loginUniquesService['generatedLogins'] = new Set();
        loginUniquesService['generatedEmails'] = new Set();

        loginExistsSpy = jest.spyOn(loginUniquesService, 'loginExists');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should generate a unique login and email based on name and surname when no conflict', async () => {
        loginExistsSpy.mockResolvedValueOnce(false);

        const { login, email } = await loginUniquesService.generateUniqueLoginAndEmailBasedOnName('John', 'Doe');

        expect(login).toBe('john.doe');
        expect(email).toBe('john.doe@example.com');
    });

    it('should generate a unique login and email with count when conflicts exist', async () => {
        loginExistsSpy.mockResolvedValueOnce(true).mockResolvedValueOnce(false);

        const { login, email } = await loginUniquesService.generateUniqueLoginAndEmailBasedOnName('John', 'Doe');

        expect(login).toBe('john.doe1');
        expect(email).toBe('john.doe1@example.com');
    });

    it('should increment count correctly for subsequent calls', async () => {
        loginExistsSpy
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(false)
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(true)
            .mockResolvedValueOnce(false);

        const result1 = await loginUniquesService.generateUniqueLoginAndEmailBasedOnName('John', 'Doe');
        const result2 = await loginUniquesService.generateUniqueLoginAndEmailBasedOnName('John', 'Doe');

        expect(result1).toEqual({ login: 'john.doe3', email: 'john.doe3@example.com' });
        expect(result2).toEqual({ login: 'john.doe4', email: 'john.doe4@example.com' });
    });
});
