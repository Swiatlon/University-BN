import { IUserInfoService, IUserInfo } from 'types/services/Services.Interfaces';
import { ExtendedUserDataWithRoles } from 'types/services/Services.Types';
import { getRepositoryByRole } from 'utils/repositories/Repository.Utils';

export class UserInfoService implements IUserInfoService {
    async getUserInfo(userInfoData: IUserInfo): Promise<ExtendedUserDataWithRoles | null> {
        const { accountId, roles } = userInfoData;
        const repository = getRepositoryByRole(roles[0]);

        if (roles[0] && 'getUserBasicDataByAccountId' in repository) {
            const userData = await repository.getUserBasicDataByAccountId(accountId);

            if (userData) {
                return { ...userData, roles };
            }
        }

        return null;
    }
}
