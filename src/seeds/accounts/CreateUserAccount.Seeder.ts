import { DataSource } from 'typeorm';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { UserAccountFactory } from 'factories/accounts/UserAccountFactory';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateUserAccount extends CustomSeederWithTimer {
    private accountsFactory: UserAccountFactory = new UserAccountFactory();

    public async seed(dataSource: DataSource): Promise<void> {
        await this.runInTransaction(dataSource, async (transactionalEntityManager) => {
            const userTestAccount = await this.accountsFactory.create(RolesEnum.USER);
            await transactionalEntityManager.save(UserAccount, userTestAccount);
        });
    }
}
