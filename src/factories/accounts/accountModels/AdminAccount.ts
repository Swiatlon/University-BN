import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';

export class AdminAccount extends UserAccount implements IUserAccount {
    constructor() {
        super();
        this.login = 'admin';
        this.email = 'admin@example.com';
        this.password = 'admin!';
        this.isActive = true;
    }
}
