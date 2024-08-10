import { hashPassword } from 'utils/Db/globalHelpers';
import { AdminAccount } from './AccountModels/AdminAccount';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { EmployeeAccount } from './AccountModels/EmployeeAccount';
import { StudentAccount } from './AccountModels/StudentAccount';
import { CompanyAccount } from './AccountModels/CompanyAccount';
import { CustomUserAccount } from './AccountModels/UserAccount';
import { ExternalParticipantAccount } from './AccountModels/ExternalParticipantAccount'; // Import the ExternalParticipantAccount
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';
import { IUserAccountFactory } from 'types/Factories/Factory.Interfaces';
import { IBasicPersonSchema, IExtendedPersonSchema } from 'types/Persons/Persons/Persons.Interfaces';

export class UserAccountFactory implements IUserAccountFactory {
    async create(role: RolesEnum, data?: IExtendedPersonSchema | string | IBasicPersonSchema): Promise<IUserAccount> {
        let account: IUserAccount;

        switch (role) {
            case RolesEnum.ADMIN: {
                account = new AdminAccount();
                break;
            }
            case RolesEnum.USER: {
                account = new CustomUserAccount();
                break;
            }
            case RolesEnum.STUDENT: {
                account = await StudentAccount.create(data as IExtendedPersonSchema);
                break;
            }
            case RolesEnum.EMPLOYEE: {
                account = await EmployeeAccount.create(data as IExtendedPersonSchema);
                break;
            }
            case RolesEnum.COMPANY: {
                account = await CompanyAccount.create(data as string);
                break;
            }
            case RolesEnum.EXTERNAL_PARTICIPANT: {
                account = await ExternalParticipantAccount.create(data as IBasicPersonSchema);
                break;
            }
            default:
                throw new Error('Invalid role!');
        }

        account.password = await hashPassword(account.password);

        return account;
    }
}
