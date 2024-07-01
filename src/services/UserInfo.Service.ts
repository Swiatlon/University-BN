import { IUserInfoService, IUserInfo, ExtendedUserDataWithRoles } from 'interfaces/Services/IServices';
import { UserRepository } from 'repositories/Accounts/User.Repository';

export class UserInfoService implements IUserInfoService {
    async getUserInfo(userInfoData: IUserInfo): Promise<ExtendedUserDataWithRoles | null> {
        const { id, queryRole, roles } = userInfoData;

        if (queryRole) {
            const userData = await UserRepository({ queryRole }).getUserBasicData(id);

            if (userData) {
                return { ...userData, roles };
            }
        }

        return null;
    }
}
