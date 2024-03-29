import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { UserAccount } from 'entities/UserAccountEntity';
import { Role } from 'entities/RoleEntity';
import { RolesEnums } from 'constants/general/generalConstants';

export class CreateAdminAccount implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        await dataSource.transaction(async (transactionalEntityManager) => {
            const adminEmail = 'admin@example.com';
            let adminAccount = await transactionalEntityManager.findOne(UserAccount, {
                where: { email: adminEmail },
            });

            if (!adminAccount) {
                adminAccount = new UserAccount();
                adminAccount.login = 'admin';
                adminAccount.email = adminEmail;
                adminAccount.password = 'admin!';

                const adminRole = await transactionalEntityManager.findOne(Role, {
                    where: { name: RolesEnums.admin },
                });

                if (!adminRole) {
                    throw new Error('Admin role does not exist. Ensure the role is created before running this seeder.');
                }

                adminAccount.roles = [adminRole];

                await transactionalEntityManager.save(adminAccount);
            }
        });
    }
}
