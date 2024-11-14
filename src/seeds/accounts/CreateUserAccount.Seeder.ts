import { AppDataSource } from 'configs/database';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { UserAccountFactory } from 'factories/accounts/UserAccountFactory';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateUserAccount extends CustomSeederWithTimer {
    private accountsFactory = new UserAccountFactory();
    private userAccountRepository = AppDataSource.getRepository(UserAccount);

    protected async beforeSeed(): Promise<boolean> {
        const existingUserAccount = await this.userAccountRepository.findOne({
            where: { login: 'user' },
        });

        return !existingUserAccount;
    }

    public async seed(): Promise<void> {
        await this.runInTransaction(AppDataSource, async (transactionalEntityManager) => {
            const userTestAccount = await this.accountsFactory.create(RolesEnum.USER);
            await transactionalEntityManager.save(UserAccount, userTestAccount);
        });
    }
}
