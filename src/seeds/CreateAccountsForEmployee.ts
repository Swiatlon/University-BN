import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Person } from 'entities/Schemas/PersonSchema';
import { UserAccountFactory } from 'factories/UserAccountFactory';
import { UserAccount } from 'entities/UserAccountEntity';
import { employeeRepository } from 'repositories/EmployeeRepository';
import { Employee } from 'entities/EmployeeEntity';

export class CreateAccountsForEmployee implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const employeeWithoutAccounts = await employeeRepository(dataSource).findEmployeeWithoutAccount();
        const accountsFactory = new UserAccountFactory();

        await dataSource.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < employeeWithoutAccounts.length; i++) {
                const employee = employeeWithoutAccounts[i] as Person;
                const newAccount = accountsFactory.create(employee);

                await transactionalEntityManager.save(UserAccount, newAccount);

                employee.accountId = newAccount.id;

                await transactionalEntityManager.save(Employee, employee);
            }
        });
    }
}
