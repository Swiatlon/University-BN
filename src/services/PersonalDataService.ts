import { IUserAllData } from 'interfaces/Accounts/IAccounts';
import { UserInfo } from './UserInfoService';
import { UserRepository } from 'repositories/Accounts/UserRepository';

export class PersonalDataService {
    async getUserAllData(userInfoData: UserInfo): Promise<IUserAllData | null> {
        const { id, queryRole } = userInfoData;

        if (queryRole) {
            return await UserRepository({ queryRole }).getUserAllData(id);
        }

        return null;
    }
}
