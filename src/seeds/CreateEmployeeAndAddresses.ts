import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { AddressFactory } from 'factories/AddressFactory';
import { EmployeeAddress } from 'entities/EmployeeAddressEntity';
import { Employee } from 'entities/EmployeeEntity';
import { EmployeeFactory } from 'factories/EmployeeFactory';

const amountOfNewEmployee = 10;

export class CreateEmployeeAndAddresses implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const employeeFactory = new EmployeeFactory();
        const addressFactory = new AddressFactory();

        await dataSource.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < amountOfNewEmployee; i++) {
                const address = addressFactory.create();

                await transactionalEntityManager.save(EmployeeAddress, address);

                const employee = employeeFactory.create(address.id);

                await transactionalEntityManager.save(Employee, employee);
            }
        });
    }
}
