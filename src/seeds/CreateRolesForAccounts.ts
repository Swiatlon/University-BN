import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Role } from 'entities/RoleEntity';
import { Employee } from 'entities/EmployeeEntity';
import { Student } from 'entities/StudentEntity';
import { accountRepository } from 'repositories/AccountsRepository';
import { RolesEnums } from 'constants/general/generalConstants';

export class CreateRolesForAccounts implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const accountsWithoutRoles = await accountRepository(dataSource).findAccountsWithoutRole();

        const roleRepository = dataSource.getRepository(Role);
        const studentRole = await roleRepository.findOneBy({ name: RolesEnums.student });
        const teacherRole = await roleRepository.findOneBy({ name: RolesEnums.teacher });

        if (!studentRole || !teacherRole) {
            throw new Error('Required roles do not exist in the database.');
        }

        await dataSource.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < accountsWithoutRoles.length; i++) {
                const account = accountsWithoutRoles[i];

                const employee = await transactionalEntityManager.createQueryBuilder(Employee, 'employee').where('employee.accountId = :accountId', { accountId: account.id }).getOne();

                if (employee) {
                    account.roles = [teacherRole];
                    await transactionalEntityManager.save(account);
                    continue;
                }

                const student = await transactionalEntityManager.createQueryBuilder(Student, 'student').where('student.accountId = :accountId', { accountId: account.id }).getOne();

                if (student) {
                    account.roles = [studentRole];
                    await transactionalEntityManager.save(account);
                    continue;
                }
            }
        });
    }
}
