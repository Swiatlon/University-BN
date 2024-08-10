import { RolesEnum } from 'constants/entities/entities.Constants';
import { BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Employee } from 'entities/Employees/Employee.Entity';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { DataSource } from 'typeorm';
import { IUserAccountFactory } from 'types/Factories/Factory.Interfaces';

export class CreateMissingAccountsForEmployees extends CustomSeederWithTimer {
    private accountsFactory: IUserAccountFactory = new UserAccountFactory();

    public async seed(dataSource: DataSource): Promise<void> {
        const employeesWithoutAccounts = await EmployeeRepository(dataSource).findEmployeeWithoutAccount();
        const totalEmployees = employeesWithoutAccounts.length;

        if (totalEmployees === 0) {
            console.log('All employees already have accounts.');
            return;
        }

        console.log(`Found ${totalEmployees} employees without accounts. Creating missing accounts...`);

        for (let i = 0; i < totalEmployees; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, totalEmployees - i);
            const employeeBatch = employeesWithoutAccounts.slice(i, i + batchSize);

            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (const employee of employeeBatch) {
                        const newAccount = await this.accountsFactory.create(RolesEnum.EMPLOYEE, employee);

                        await transactionalEntityManager.save(UserAccount, newAccount);

                        employee.account = newAccount;

                        await transactionalEntityManager.save(Employee, employee);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at employee ${i}:`, error);
            }
        }
    }
}
