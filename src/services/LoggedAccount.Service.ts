import { ILoggedAccountData, ILoggedAccountService } from 'types/services/Services.Interfaces';
import { ExtendedLoggedAccountData } from 'types/services/Services.Types';
import { getRepositoryByRole } from 'utils/repositories/Repository.Utils';

export class LoggedAccountService implements ILoggedAccountService {
    async getLoggedAccountData(loggedAccountData: ILoggedAccountData): Promise<ExtendedLoggedAccountData | null> {
        const { accountId, roles } = loggedAccountData;
        const repository = getRepositoryByRole(roles[0]);

        if (roles[0] && 'getUserBasicDataByAccountId' in repository) {
            const userData = await repository.getUserBasicDataByAccountId(accountId);

            if (userData) {
                return { ...userData, accountId, roles };
            }
        }

        return null;
    }
}

export const loggedAccountService = new LoggedAccountService();
