import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { AddressFactory } from 'factories/Persons/Address.Factory';
import { EmployeeAddress } from 'entities/Employees/EmployeeAddress.Entity';
import { EmployeeConsent } from 'entities/Employees/EmployeeConsent.Entity';
import { Employee } from 'entities/Employees/Employee.Entity';
import { ConsentFactory } from 'factories/Persons/Consent.Factory';
import { EmployeeFactory } from 'factories/Persons/Employee.Factory';
import { AMOUNT_OF_NEW_EMPLOYEES } from 'constants/seeders/seeder.Constants';

export class CreateEmployee implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const employeeFactory = new EmployeeFactory();
        const addressFactory = new AddressFactory();
        const consentFactory = new ConsentFactory();

        await dataSource.transaction(async (transactionalEntityManager) => {
            for (let i = 0; i < AMOUNT_OF_NEW_EMPLOYEES; i++) {
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
