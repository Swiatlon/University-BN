import { IUserAccountFactory } from 'interfaces/Factories/IFactories';
import { hashPassword } from 'utils/globalHelpers';
import { AdminAccount } from './AccountModels/AdminAccount';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { IUserAccount } from 'interfaces/Accounts/IAccounts';
import { EmployeeAccount } from './AccountModels/EmployeeAccount';
import { StudentAccount } from './AccountModels/StudentAccount';
import { Person } from 'entities/Schemas/Person.Schema';
import { CustomUserAccount } from './AccountModels/UserAccount';
import { ILoginUniquesService } from 'interfaces/Services/IServices';
import { LoginUniquesService } from 'services/LoginUniques.Service';

export class UserAccountFactory implements IUserAccountFactory {
    private loginUniquesService: ILoginUniquesService = new LoginUniquesService();

    async createAccount(role: RolesEnum, person?: Person): Promise<IUserAccount> {
        let account: IUserAccount;

        switch (role) {
            case RolesEnum.admin: {
                account = new AdminAccount();
                break;
            }
            case RolesEnum.user: {
                account = new CustomUserAccount();
                break;
            }
            case RolesEnum.student: {
                account = new StudentAccount();
                const studentLoginEmail = await this.loginUniquesService.generateUniqueLoginAndEmailBasedOnName(person!.name, person!.surname);
                account.login = studentLoginEmail.login;
                account.email = studentLoginEmail.email;
                break;
            }
            case RolesEnum.employee: {
                account = new EmployeeAccount();
                const employeeLoginEmail = await this.loginUniquesService.generateUniqueLoginAndEmailBasedOnName(person!.name, person!.surname);
                account.login = employeeLoginEmail.login;
                account.email = employeeLoginEmail.email;
                break;
            }
            default:
                throw new Error('Invalid role!');
        }

        account.password = await hashPassword(account.password);

        return account;
    }
}
