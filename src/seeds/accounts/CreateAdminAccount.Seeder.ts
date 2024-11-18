import { AppDataSource } from 'configs/database';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { UserAccountFactory } from 'factories/accounts/UserAccountFactory';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateAdminAccount extends CustomSeederWithTimer {
    private accountsFactory = new UserAccountFactory();
    private userAccountRepository = AppDataSource.getRepository(UserAccount);

    protected async beforeSeed(): Promise<boolean> {
        const existingAdminAccount = await this.userAccountRepository.findOne({
            where: { login: 'admin' },
        });

        return !existingAdminAccount;
    }

    public async seed(): Promise<void> {
        await this.runInTransaction(AppDataSource, async (transactionalEntityManager) => {
            const adminAccount = await this.accountsFactory.create(RolesEnum.ADMIN);
            await transactionalEntityManager.save(UserAccount, adminAccount);
        });
    }
}
