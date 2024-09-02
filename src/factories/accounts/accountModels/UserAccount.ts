import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { IUserAccount } from 'types/accounts/Accounts.Interfaces';

export class CustomUserAccount extends UserAccount implements IUserAccount {
    constructor() {
        super();
        this.login = 'user';
        this.email = 'user@example.com';
        this.password = 'user';
        this.isActive = true;
    }
}
