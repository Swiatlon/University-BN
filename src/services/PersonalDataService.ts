import { UserInfo } from './UserInfoService';
import { IUserAllData } from 'interfaces/IUserAccount';
import { userRepository } from 'repositories/UserRepository';

export class PersonalDataService {
    async getUserAllData(userInfoData: UserInfo): Promise<IUserAllData | null> {
        const { id, queryRole } = userInfoData;

        if (queryRole) {
            return await userRepository({ queryRole }).getUserAllData(id);
        }

        return null;
    }
}
