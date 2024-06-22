import { IUserAllData } from 'interfaces/Accounts/IAccounts';
import { UserInfo } from './UserInfo.Service';
import { UserRepository } from 'repositories/Accounts/User.Repository';

export class PersonalDataService {
    async getUserAllData(userInfoData: UserInfo): Promise<IUserAllData | null> {
        const { id, queryRole } = userInfoData;

        if (queryRole) {
            return await UserRepository({ queryRole }).getUserAllData(id);
        }

        return null;
    }
}
