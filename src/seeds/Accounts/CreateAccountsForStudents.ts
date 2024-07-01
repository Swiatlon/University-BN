import { DataSource } from 'typeorm';
import { StudentRepository } from 'repositories/Persons/Student.Repository';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateAccountsForStudents extends CustomSeederWithTimer {
    private accountsFactory: UserAccountFactory = new UserAccountFactory();

    public async seed(dataSource: DataSource): Promise<void> {
        const studentsWithoutAccounts = await StudentRepository(dataSource).findStudentsWithoutAccount();
        const totalStudents = studentsWithoutAccounts.length;

        for (let i = 0; i < totalStudents; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, totalStudents - i);
            const studentBatch = studentsWithoutAccounts.slice(i, i + batchSize);

            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (const student of studentBatch) {
                        const newAccount = await this.accountsFactory.createAccount(RolesEnum.student, student);

                        await transactionalEntityManager.save(UserAccount, newAccount);

                        student.accountId = newAccount.id;

                        await transactionalEntityManager.save(Student, student);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at student ${i}:`, error);
            }
        }
    }
}
