import { IUserAllData } from 'interfaces/Accounts/IAccounts';
import { UserRepository } from 'repositories/Accounts/User.Repository';
import { IPersonalDataService, IUserInfo } from 'interfaces/Services/IServices';

export class PersonalDataService implements IPersonalDataService {
    async getUserAllData(userInfoData: IUserInfo): Promise<IUserAllData | null> {
        const { id, queryRole } = userInfoData;

        if (queryRole) {
            return await UserRepository({ queryRole }).getUserAllData(id);
        }

        return null;
    }
}
