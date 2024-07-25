import { UserRepository } from 'repositories/Accounts/User.Repository';
import { IUserAllData } from 'types/Accounts/Accounts.Interfaces';
import { IPersonalDataService, IUserInfo } from 'types/Services/Services.Interfaces';

export class PersonalDataService implements IPersonalDataService {
    async getUserAllData(userInfoData: IUserInfo): Promise<IUserAllData | null> {
        const { id, queryRole } = userInfoData;

        if (queryRole) {
            return await UserRepository({ queryRole }).getUserAllData(id);
        }

        return null;
    }
}
