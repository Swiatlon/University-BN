import { StudentAccount } from 'factories/Accounts/AccountModels/StudentAccount';

describe('StudentAccount', () => {
    it('should create an Student account with default values', () => {
        const account = new StudentAccount();

        expect(account.login).toBe('');
        expect(account.email).toBe('');
        expect(account.password).toBe('defaultpassword');
        expect(account.isActive).toBe(true);
    });
});
