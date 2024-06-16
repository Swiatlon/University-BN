import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Person } from 'entities/Schemas/PersonSchema';
import { UserAccount } from 'entities/Accounts/UserAccountEntity';
import { Employee } from 'entities/Employees/EmployeeEntity';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';
import { EmployeeRepository } from 'repositories/Persons/EmployeeRepository';

export class CreateAccountsForEmployee implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const employeeWithoutAccounts = await EmployeeRepository(dataSource).findEmployeeWithoutAccount();
        const accountsFactory = new UserAccountFactory();

        await dataSource.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < employeeWithoutAccounts.length; i++) {
                const employee = employeeWithoutAccounts[i] as Person;
                const newAccount = await accountsFactory.create(employee).then();

                await transactionalEntityManager.save(UserAccount, newAccount);

                employee.accountId = newAccount.id;

                await transactionalEntityManager.save(Employee, employee);
            }
        });
    }
}
