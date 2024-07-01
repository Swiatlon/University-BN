import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { IUserAccount } from 'interfaces/Accounts/IAccounts';

export class StudentAccount extends UserAccount implements IUserAccount {
    constructor() {
        super();
        this.login = '';
        this.email = '';
        this.password = 'defaultpassword';
        this.isActive = true;
    }
}
