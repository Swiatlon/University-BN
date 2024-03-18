import { Student } from 'entities/StudentEntity';
import { UserAccount } from 'entities/UserAccountEntity';

export class UserAccountFactory {
    create(student: Student): UserAccount {
        const userAccount = new UserAccount();
        userAccount.login = `${student.name}.${student.surname}`.toLowerCase();
        userAccount.email = `${student.name}.${student.surname}@example.com`.toLowerCase();
        userAccount.password = 'defaultPassword';
        userAccount.isActive = true;

        return userAccount;
    }
}
