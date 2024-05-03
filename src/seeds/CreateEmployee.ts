import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { AddressFactory } from 'factories/AddressFactory';
import { EmployeeAddress } from 'entities/EmployeeAddressEntity';
import { Employee } from 'entities/EmployeeEntity';
import { EmployeeFactory } from 'factories/EmployeeFactory';
import { ConsentFactory } from 'factories/ConsentFactory';
import { EmployeeConsent } from 'entities/EmployeeConsentEntity';

const amountOfNewEmployee = 10;

export class CreateEmployee implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const employeeFactory = new EmployeeFactory();
        const addressFactory = new AddressFactory();
        const consentFactory = new ConsentFactory();

        await dataSource.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < amountOfNewEmployee; i++) {
                const address = addressFactory.create();

                await transactionalEntityManager.save(EmployeeAddress, address);

                const consent = consentFactory.create();

                await transactionalEntityManager.save(EmployeeConsent, consent);

                const employee = employeeFactory.create(address.id, consent.id);

                await transactionalEntityManager.save(Employee, employee);
            }
        });
    }
}
