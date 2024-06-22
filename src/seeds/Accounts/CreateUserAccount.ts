import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { RolesEnums } from 'constants/general/general.Constants';
import { hashPassword } from 'utils/globalHelpers';
import { Role } from 'entities/Accounts/Role.Entity';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';

export class CreateUserAccount implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        await dataSource.transaction(async (transactionalEntityManager) => {
            const userEmail = 'user@example.com';
            let userTestAccount = await transactionalEntityManager.findOne(UserAccount, {
                where: { email: userEmail },
            });

            if (!userTestAccount) {
                userTestAccount = new UserAccount();
                userTestAccount.login = 'user';
                userTestAccount.email = userEmail;
                userTestAccount.password = await hashPassword('user!');

                const studentRole = await transactionalEntityManager.findOne(Role, {
                    where: { name: RolesEnums.student },
                });

                if (!studentRole) {
                    throw new Error('Student role does not exist. Ensure the role is created before running this seeder.');
                }

                userTestAccount.roles = [studentRole];

                await transactionalEntityManager.save(userTestAccount);
            }
        });
    }
}
