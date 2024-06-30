import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';

export class CreateAdminAccount implements Seeder {
    private accountsFactory: UserAccountFactory = new UserAccountFactory();

    public async run(dataSource: DataSource): Promise<void> {
        await dataSource.transaction(async (transactionalEntityManager) => {
            const adminAccount = await this.accountsFactory.createAccount(RolesEnum.admin);

            await transactionalEntityManager.save(UserAccount, adminAccount);
        });
    }
}
