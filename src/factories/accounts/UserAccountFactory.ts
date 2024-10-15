import { hashPassword } from 'utils/db/globalHelpers';
import { AdminAccount } from './accountModels/AdminAccount';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { EmployeeAccount } from './accountModels/EmployeeAccount';
import { StudentAccount } from './accountModels/StudentAccount';
import { CompanyAccount } from './accountModels/CompanyAccount';
import { CustomUserAccount } from './accountModels/UserAccount';
import { ExternalParticipantAccount } from './accountModels/ExternalParticipantAccount';
import { IUserAccount } from 'types/accounts/Accounts.Interfaces';
import { IUserAccountFactory } from 'types/factories/Factory.Interfaces';
import { IBasicPersonSchema, IExtendedPersonSchema } from 'types/persons/persons/Persons.Interfaces';

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
