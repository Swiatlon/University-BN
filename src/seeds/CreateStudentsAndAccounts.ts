import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Student } from 'entities/StudentEntity';
import { StudentFactory } from 'factories/StudentFactory';
import { UserAccount } from 'entities/UserAccountEntity';
import { UserAccountFactory } from 'factories/UserAccountFactory';

const amountOfNewStudents = 2;

export class CreateStudentsAndAccounts implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const studentFactory = new StudentFactory();
        const userAccountFactory = new UserAccountFactory();

        for (let i = 0; i < amountOfNewStudents; i++) {
            const student = studentFactory.create();
            const userAccount = userAccountFactory.create(student);

            await dataSource.getRepository(UserAccount).save(userAccount);

            student.accountId = userAccount.id;

            await dataSource.getRepository(Student).save(student);
        }
    }
}
