import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { StudentRepository } from 'repositories/Persons/Student.Repository';
import { Person } from 'entities/Schemas/Person.Schema';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { UserAccountFactory } from 'factories/Accounts/UserAccount.Factory';

export class CreateAccountsForStudents implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const studentsWithoutAccounts = await StudentRepository(dataSource).findStudentsWithoutAccount();
        const accountsFactory = new UserAccountFactory();

        await dataSource.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < studentsWithoutAccounts.length; i++) {
                const student = studentsWithoutAccounts[i] as Person;
                const newAccount = await accountsFactory.create(student);

                await transactionalEntityManager.save(UserAccount, newAccount);

                student.accountId = newAccount.id;

                await transactionalEntityManager.save(Student, student);
            }
        });
    }
}
