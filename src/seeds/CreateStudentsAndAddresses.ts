import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Student } from 'entities/StudentEntity';
import { StudentFactory } from 'factories/StudentFactory';
import { AddressFactory } from 'factories/AddressFactory';
import { StudentAddress } from 'entities/StudentAddressEntity';

const amountOfNewStudents = 5;

export class CreateStudentsAndAddresses implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const studentFactory = new StudentFactory();
        const addressFactory = new AddressFactory();

        await dataSource.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < amountOfNewStudents; i++) {
                const address = addressFactory.create();

                await transactionalEntityManager.save(StudentAddress, address);

                const student = studentFactory.create(address.id);

                await transactionalEntityManager.save(Student, student);
            }
        });
    }
}
