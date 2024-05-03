import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Student } from 'entities/StudentEntity';
import { StudentFactory } from 'factories/StudentFactory';
import { AddressFactory } from 'factories/AddressFactory';
import { StudentAddress } from 'entities/StudentAddressEntity';
import { ConsentFactory } from 'factories/ConsentFactory';
import { StudentConsent } from 'entities/StudentConsentEntity';

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
