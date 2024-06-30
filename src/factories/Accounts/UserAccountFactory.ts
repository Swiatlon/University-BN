import { IUserAccountFactory } from 'interfaces/Factories/IFactories';
import { hashPassword } from 'utils/globalHelpers';
import { AdminAccount } from './AccountModels/AdminAccount';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { IUserAccount } from 'interfaces/Accounts/IAccounts';
import { EmployeeAccount } from './AccountModels/EmployeeAccount';
import { StudentAccount } from './AccountModels/StudentAccount';
import { Person } from 'entities/Schemas/Person.Schema';
import { CustomUserAccount } from './AccountModels/UserAccount';

export class UserAccountFactory implements IUserAccountFactory {
    async createAccount(role: RolesEnum, person?: Person): Promise<IUserAccount> {
        let account: IUserAccount;

        switch (role) {
            case RolesEnum.admin:
                account = new AdminAccount();
                break;
            case RolesEnum.user:
                account = new CustomUserAccount();
                break;
            case RolesEnum.student:
                account = new StudentAccount(person as Person);
                break;
            case RolesEnum.employee:
                account = new EmployeeAccount(person as Person);
                break;
            default:
                throw new Error('Invalid role!');
        }

        account.password = await hashPassword(account.password);

        return account;
    }
}
