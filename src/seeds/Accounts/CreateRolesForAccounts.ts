import { DataSource } from 'typeorm';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { Role } from 'entities/Accounts/Role.Entity';
import { AccountRepository } from 'repositories/Accounts/Accounts.Repository';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';
import { StudentRepository } from 'repositories/Persons/Student.Repository';
import { BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateRolesForAccounts extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const accountsWithoutRoles = await AccountRepository(dataSource).findWithoutRoleAccounts();
        const totalAccounts = accountsWithoutRoles.length;

        const roleRepository = dataSource.getRepository(Role);
        const studentRole = await roleRepository.findOneBy({ name: RolesEnum.student });
        const teacherRole = await roleRepository.findOneBy({ name: RolesEnum.teacher });

        if (!studentRole || !teacherRole) {
            return;
        }

        for (let i = 0; i < totalAccounts; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, totalAccounts - i);
            const accountBatch = accountsWithoutRoles.slice(i, i + batchSize);

            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (const account of accountBatch) {
                        const employee = await EmployeeRepository(dataSource).findEmployeeByAccountId(account.id);

                        if (employee) {
                            account.roles = [teacherRole];
                            await transactionalEntityManager.save(UserAccount, account);
                            continue;
                        }

                        const student = await StudentRepository(dataSource).findStudentByAccountId(account.id);

                        if (student) {
                            account.roles = [studentRole];
                            await transactionalEntityManager.save(UserAccount, account);
                        }
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at account ${i}:`, error);
            }
        }
    }
}
