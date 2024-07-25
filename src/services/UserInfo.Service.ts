import { UserRepository } from 'repositories/Accounts/User.Repository';
import { IUserInfoService, IUserInfo } from 'types/Services/Services.Interfaces';
import { ExtendedUserDataWithRoles } from 'types/Services/Services.Types';

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
