import { DataSource } from 'typeorm';
import { AddressFactory } from 'factories/Persons/Address.Factory';
import { EmployeeAddress } from 'entities/Employees/EmployeeAddress.Entity';
import { EmployeeConsent } from 'entities/Employees/EmployeeConsent.Entity';
import { Employee } from 'entities/Employees/Employee.Entity';
import { ConsentFactory } from 'factories/Persons/Consent.Factory';
import { EmployeeFactory } from 'factories/Persons/Employee.Factory';
import { AMOUNT_OF_NEW_EMPLOYEES, BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';

export class CreateEmployee extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const employeeFactory = new EmployeeFactory();
        const addressFactory = new AddressFactory();
        const consentFactory = new ConsentFactory();

        for (let i = 0; i < AMOUNT_OF_NEW_EMPLOYEES; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, AMOUNT_OF_NEW_EMPLOYEES - i);
            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (let j = 0; j < batchSize; j++) {
                        const address = addressFactory.create();
                        await transactionalEntityManager.save(EmployeeAddress, address);

                        const consent = consentFactory.create();
                        await transactionalEntityManager.save(EmployeeConsent, consent);

                        const employee = employeeFactory.create(address.id, consent.id);
                        await transactionalEntityManager.save(Employee, employee);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at employee ${i}:`, error);
            }
        }
    }
}
