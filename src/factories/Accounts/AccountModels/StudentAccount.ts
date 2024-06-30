import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Person } from 'entities/Schemas/Person.Schema';
import { IUserAccount } from 'interfaces/Accounts/IAccounts';

export class StudentAccount extends UserAccount implements IUserAccount {
    constructor(person: Person) {
        super();
        this.login = `${person.name}.${person.surname}`.toLowerCase();
        this.email = `${person.name}.${person.surname}@example.com`.toLowerCase();
        this.password = 'defaultpassword';
        this.isActive = true;
    }
}
