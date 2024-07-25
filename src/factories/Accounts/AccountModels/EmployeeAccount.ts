import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';

export class EmployeeAccount extends UserAccount implements IUserAccount {
    constructor() {
        super();
        this.login = '';
        this.email = '';
        this.password = 'defaultpassword';
        this.isActive = true;
    }
}
