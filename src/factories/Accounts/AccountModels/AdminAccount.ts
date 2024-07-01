import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { IUserAccount } from 'interfaces/Accounts/IAccounts';

export class AdminAccount extends UserAccount implements IUserAccount {
    constructor() {
        super();
        this.login = 'admin';
        this.email = 'admin@example.com';
        this.password = 'admin!';
        this.isActive = true;
    }
}
