import { CustomUserAccount } from 'factories/Accounts/AccountModels/UserAccount';

describe('UserAccount', () => {
    it('should create an User account with default values', () => {
        const account = new CustomUserAccount();

        expect(account.login).toBe('user');
        expect(account.email).toBe('user@example.com');
        expect(account.password).toBe('user');
        expect(account.isActive).toBe(true);
    });
});
