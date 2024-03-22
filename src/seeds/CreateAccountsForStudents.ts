import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Student } from 'entities/StudentEntity';
import { studentRepository } from 'repositories/StudentRepository';
import { Person } from 'entities/Schemas/PersonSchema';
import { UserAccountFactory } from 'factories/UserAccountFactory';
import { UserAccount } from 'entities/UserAccountEntity';

export class CreateAccountsForStudents implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const StudentsWithoutAccounts = await studentRepository(dataSource).findStudentsWithoutAccount();
        const accountsFactory = new UserAccountFactory();

        await dataSource.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < StudentsWithoutAccounts.length; i++) {
                const student = StudentsWithoutAccounts[i] as Person;
                const newAccount = accountsFactory.create(student);

                await transactionalEntityManager.save(UserAccount, newAccount);

                student.accountId = newAccount.id;

                await transactionalEntityManager.save(Student, student);
            }
        });
    }
}
