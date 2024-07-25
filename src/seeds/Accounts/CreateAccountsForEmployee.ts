import { DataSource } from 'typeorm';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Employee } from 'entities/Employees/Employee.Entity';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';
import { BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { IUserAccountFactory } from 'types/Factories/Factories.Interfaces';

export class CreateAccountsForEmployee extends CustomSeederWithTimer {
    private accountsFactory: IUserAccountFactory = new UserAccountFactory();

    public async seed(dataSource: DataSource): Promise<void> {
        const employeesWithoutAccounts = await EmployeeRepository(dataSource).findEmployeeWithoutAccount();
        const totalEmployees = employeesWithoutAccounts.length;

        for (let i = 0; i < totalEmployees; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, totalEmployees - i);
            const employeeBatch = employeesWithoutAccounts.slice(i, i + batchSize);

            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (const employee of employeeBatch) {
                        const newAccount = await this.accountsFactory.createAccount(RolesEnum.employee, employee);

                        await transactionalEntityManager.save(UserAccount, newAccount);

                        employee.accountId = newAccount.id;

                        await transactionalEntityManager.save(Employee, employee);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at employee ${i}:`, error);
            }
        }
    }
}
