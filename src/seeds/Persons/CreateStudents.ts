import { DataSource } from 'typeorm';
import { AddressFactory } from 'factories/Persons/Address.Factory';
import { StudentAddress } from 'entities/Students/StudentAddress.Entity';
import { StudentConsent } from 'entities/Students/StudentConsent.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { ConsentFactory } from 'factories/Persons/Consent.Factory';
import { StudentFactory } from 'factories/Persons/Student.Factory';
import { AMOUNT_OF_NEW_STUDENTS, BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateStudents extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const studentFactory = new StudentFactory();
        const addressFactory = new AddressFactory();
        const consentFactory = new ConsentFactory();

        for (let i = 0; i < AMOUNT_OF_NEW_STUDENTS; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, AMOUNT_OF_NEW_STUDENTS - i);
            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (let j = 0; j < batchSize; j++) {
                        const address = addressFactory.create();
                        await transactionalEntityManager.save(StudentAddress, address);

                        const consent = consentFactory.create();
                        await transactionalEntityManager.save(StudentConsent, consent);

                        const student = studentFactory.create(address.id, consent.id);
                        await transactionalEntityManager.save(Student, student);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at student ${i}:`, error);
            }
        }
    }
}
