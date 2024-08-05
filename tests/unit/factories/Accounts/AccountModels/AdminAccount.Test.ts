import { AdminAccount } from 'factories/Accounts/AccountModels/AdminAccount';

describe('AdminAccount', () => {
    it('should create an AdminAccount with default values', () => {
        const account = new AdminAccount();

        expect(account.login).toBe('admin');
        expect(account.email).toBe('admin@example.com');
        expect(account.password).toBe('admin!');
        expect(account.isActive).toBe(true);
    });
});
