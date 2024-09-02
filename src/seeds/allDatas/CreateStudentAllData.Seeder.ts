import { DataSource } from 'typeorm';
import { StudentAddress } from 'entities/students/StudentAddress.Entity';
import { StudentConsent } from 'entities/students/StudentConsent.Entity';
import { Student } from 'entities/students/Student.Entity';
import { AddressFactory } from 'factories/persons/Address.Factory';
import { ConsentFactory } from 'factories/persons/Consent.Factory';
import { StudentFactory } from 'factories/students/Student.Factory';
import { AMOUNT_OF_NEW_STUDENTS, BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { ExtendedPersonFactory } from 'factories/persons/ExtendedPerson.Factory';
import { UserAccountFactory } from 'factories/accounts/UserAccountFactory';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';

export class CreateStudentAllData extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const extendedPersonFactory = new ExtendedPersonFactory();
        const studentFactory = new StudentFactory();
        const addressFactory = new AddressFactory();
        const consentFactory = new ConsentFactory();
        const accountsFactory = new UserAccountFactory();

        for (let i = 0; i < AMOUNT_OF_NEW_STUDENTS; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, AMOUNT_OF_NEW_STUDENTS - i);
            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (let j = 0; j < batchSize; j++) {
                        const address = addressFactory.createWithFakeData();
                        await transactionalEntityManager.save(StudentAddress, address);

                        const consent = consentFactory.createWithFakeData();
                        await transactionalEntityManager.save(StudentConsent, consent);

                        const person = extendedPersonFactory.createWithFakeData();

                        const account = await accountsFactory.create(RolesEnum.STUDENT, person);
                        await transactionalEntityManager.save(UserAccount, account);

                        const student = studentFactory.create(person, address, consent, account);
                        await transactionalEntityManager.save(Student, student);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at student ${i}:`, error);
            }
        }
    }
}
