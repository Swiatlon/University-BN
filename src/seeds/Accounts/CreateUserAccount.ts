import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';

export class CreateUserAccount implements Seeder {
    private accountsFactory: UserAccountFactory = new UserAccountFactory();

    public async run(dataSource: DataSource): Promise<void> {
        await dataSource.transaction(async (transactionalEntityManager) => {
            const userTestAccount = await this.accountsFactory.createAccount(RolesEnum.user);

            await transactionalEntityManager.save(UserAccount, userTestAccount);
        });
    }
}
