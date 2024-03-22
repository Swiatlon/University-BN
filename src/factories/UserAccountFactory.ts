import { Person } from 'entities/Schemas/PersonSchema';
import { UserAccount } from 'entities/UserAccountEntity';

export class UserAccountFactory {
    create(person: Person): UserAccount {
        const userAccount = new UserAccount();
        userAccount.login = `${person.name}.${person.surname}`.toLowerCase();
        userAccount.email = `${person.name}.${person.surname}@example.com`.toLowerCase();
        userAccount.password = 'defaultPassword';
        userAccount.isActive = true;

        return userAccount;
    }
}
