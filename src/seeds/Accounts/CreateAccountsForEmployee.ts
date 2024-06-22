import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Person } from 'entities/Schemas/Person.Schema';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Employee } from 'entities/Employees/Employee.Entity';
import { UserAccountFactory } from 'factories/Accounts/UserAccount.Factory';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';

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
