import { DataSource } from 'typeorm';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Employee } from 'entities/Employees/Employee.Entity';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';
import { IUserAccountFactory } from 'interfaces/Factories/IFactories';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateAccountsForEmployee extends CustomSeederWithTimer {
    private accountsFactory: IUserAccountFactory = new UserAccountFactory();

    public async seed(dataSource: DataSource): Promise<void> {
        const employeeWithoutAccounts = await EmployeeRepository(dataSource).findEmployeeWithoutAccount();

        await this.runInTransaction(dataSource, async (transactionalEntityManager) => {
            for (const employee of employeeWithoutAccounts) {
                const newAccount = await this.accountsFactory.createAccount(RolesEnum.employee, employee);

                await transactionalEntityManager.save(UserAccount, newAccount);

                employee.accountId = newAccount.id;

                await transactionalEntityManager.save(Employee, employee);
            }
        });
    }
}
