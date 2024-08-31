import { DataSource } from 'typeorm';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { Role } from 'entities/Accounts/Role.Entity';
import { AccountRepository } from 'repositories/Accounts/Accounts.Repository';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';
import { StudentRepository } from 'repositories/Persons/Student.Repository';
import { BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { ExternalParticipantRepository } from 'repositories/Persons/ExternalParticipant.Repository';
import { CompanyRepository } from 'repositories/Persons/Company.Repository';

// TODO: In free time make it more solid or dry

export class CreateRolesForAccounts extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const accountsWithoutRoles = await AccountRepository(dataSource).findWithoutRoleAccounts();
        const totalAccounts = accountsWithoutRoles.length;

        const roleRepository = dataSource.getRepository(Role);
        const studentRole = await roleRepository.findOneBy({ name: RolesEnum.STUDENT });
        const teacherRole = await roleRepository.findOneBy({ name: RolesEnum.TEACHER });
        const externalParticipantRole = await roleRepository.findOneBy({ name: RolesEnum.EXTERNAL_PARTICIPANT });
        const companyRole = await roleRepository.findOneBy({ name: RolesEnum.COMPANY });

        if (!studentRole || !teacherRole || !externalParticipantRole || !companyRole) {
            console.error('One or more roles are missing. Seeding aborted.');
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
                            continue;
                        }

                        const externalParticipant = await ExternalParticipantRepository(dataSource).findExternalParticipantByAccountId(account.id);

                        if (externalParticipant) {
                            account.roles = [externalParticipantRole];
                            await transactionalEntityManager.save(UserAccount, account);
                            continue;
                        }

                        const company = await CompanyRepository(dataSource).findCompanyByAccountId(account.id);

                        if (company) {
                            account.roles = [companyRole];
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
