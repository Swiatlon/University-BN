import { EmployeeAccount } from 'factories/Accounts/AccountModels/EmployeeAccount';

describe('EmployeeAccount', () => {
    it('should create an Employee account with default values', () => {
        const account = new EmployeeAccount();

        expect(account.login).toBe('');
        expect(account.email).toBe('');
        expect(account.password).toBe('defaultpassword');
        expect(account.isActive).toBe(true);
    });
});
