import { DataSource } from 'typeorm';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { Role } from 'entities/Accounts/Role.Entity';
import { AccountRepository } from 'repositories/Accounts/Accounts.Repository';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';
import { StudentRepository } from 'repositories/Persons/Student.Repository';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateRolesForAccounts extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const accountsWithoutRoles = await AccountRepository(dataSource).findWithoutRoleAccounts();

        const roleRepository = dataSource.getRepository(Role);
        const studentRole = await roleRepository.findOneBy({ name: RolesEnum.student });
        const teacherRole = await roleRepository.findOneBy({ name: RolesEnum.teacher });

        if (!studentRole || !teacherRole) {
            return;
        }

        await this.runInTransaction(dataSource, async (transactionalEntityManager) => {
            for (const account of accountsWithoutRoles) {
                const employee = await EmployeeRepository().findEmployeeByAccountId(account.id);

                if (employee) {
                    account.roles = [teacherRole];
                    await transactionalEntityManager.save(UserAccount, account);
                    continue;
                }

                const student = await StudentRepository().findStudentByAccountId(account.id);

                if (student) {
                    account.roles = [studentRole];
                    await transactionalEntityManager.save(UserAccount, account);
                }
            }
        });
    }
}
