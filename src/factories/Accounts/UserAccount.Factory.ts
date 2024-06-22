import { Person } from 'entities/Schemas/Person.Schema';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { hashPassword } from 'utils/globalHelpers';

export class UserAccountFactory {
    async create(person: Person): Promise<UserAccount> {
        const userAccount = new UserAccount();
        userAccount.login = `${person.name}.${person.surname}`.toLowerCase();
        userAccount.email = `${person.name}.${person.surname}@example.com`.toLowerCase();
        userAccount.password = await hashPassword('defaultpassword');
        userAccount.isActive = true;

        return userAccount;
    }
}
