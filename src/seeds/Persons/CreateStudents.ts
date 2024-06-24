import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { AddressFactory } from 'factories/Persons/Address.Factory';
import { StudentAddress } from 'entities/Students/StudentAddress.Entity';
import { StudentConsent } from 'entities/Students/StudentConsent.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { ConsentFactory } from 'factories/Persons/Consent.Factory';
import { StudentFactory } from 'factories/Persons/Student.Factory';

const amountOfNewStudents = 10;

export class CreateStudents implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const studentFactory = new StudentFactory();
        const addressFactory = new AddressFactory();
        const consentFactory = new ConsentFactory();

        await dataSource.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < amountOfNewStudents; i++) {
                const address = addressFactory.create();

                await transactionalEntityManager.save(StudentAddress, address);

                const consent = consentFactory.create();

                await transactionalEntityManager.save(StudentConsent, consent);

                const student = studentFactory.create(address.id, consent.id);

                await transactionalEntityManager.save(Student, student);
            }
        });
    }
}
