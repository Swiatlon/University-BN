import { DataSource } from 'typeorm';
import { StudentRepository } from 'repositories/persons/Student.Repository';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { Student } from 'entities/students/Student.Entity';
import { UserAccountFactory } from 'factories/accounts/UserAccountFactory';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateMissingAccountsForStudents extends CustomSeederWithTimer {
    private accountsFactory: UserAccountFactory = new UserAccountFactory();

    public async seed(dataSource: DataSource): Promise<void> {
        const studentsWithoutAccounts = await StudentRepository(dataSource).findStudentsWithoutAccount();
        const totalStudents = studentsWithoutAccounts.length;

        if (totalStudents === 0) {
            console.log('All students already have accounts.');
            return;
        }

        console.log(`Found ${totalStudents} students without accounts. Creating missing accounts...`);

        for (let i = 0; i < totalStudents; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, totalStudents - i);
            const studentBatch = studentsWithoutAccounts.slice(i, i + batchSize);

            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (const student of studentBatch) {
                        const newAccount = await this.accountsFactory.create(RolesEnum.STUDENT, student);

                        await transactionalEntityManager.save(UserAccount, newAccount);

                        student.account = newAccount;

                        await transactionalEntityManager.save(Student, student);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at student ${i}:`, error);
            }
        }
    }
}
