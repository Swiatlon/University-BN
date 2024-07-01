import { DataSource } from 'typeorm';
import { StudentRepository } from 'repositories/Persons/Student.Repository';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateAccountsForStudents extends CustomSeederWithTimer {
    private accountsFactory: UserAccountFactory = new UserAccountFactory();

    public async seed(dataSource: DataSource): Promise<void> {
        const studentsWithoutAccounts = await StudentRepository(dataSource).findStudentsWithoutAccount();

        await this.runInTransaction(dataSource, async (transactionalEntityManager) => {
            for (const student of studentsWithoutAccounts) {
                const newAccount = await this.accountsFactory.createAccount(RolesEnum.student, student);

                await transactionalEntityManager.save(UserAccount, newAccount);

                student.accountId = newAccount.id;

                await transactionalEntityManager.save(Student, student);
            }
        });
    }
}
