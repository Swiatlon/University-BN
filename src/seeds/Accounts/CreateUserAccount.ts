import { DataSource } from 'typeorm';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateUserAccount extends CustomSeederWithTimer {
    private accountsFactory: UserAccountFactory = new UserAccountFactory();

    public async seed(dataSource: DataSource): Promise<void> {
        await this.runInTransaction(dataSource, async (transactionalEntityManager) => {
            const userTestAccount = await this.accountsFactory.createAccount(RolesEnum.user);
            await transactionalEntityManager.save(UserAccount, userTestAccount);
        });
    }
}
