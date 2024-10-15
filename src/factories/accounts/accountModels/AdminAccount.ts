import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { IUserAccount } from 'types/accounts/Accounts.Interfaces';

export class AdminAccount extends UserAccount implements IUserAccount {
    constructor() {
        super();
        this.login = 'admin';
        this.email = 'admin@example.com';
        this.password = 'admin!';
        this.isActive = true;
    }
}
