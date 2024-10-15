import { DataSource } from 'typeorm';
import { AddressFactory } from 'factories/persons/Address.Factory';
import { ConsentFactory } from 'factories/persons/Consent.Factory';
import { AMOUNT_OF_NEW_EMPLOYEES, BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { ExtendedPersonFactory } from 'factories/persons/ExtendedPerson.Factory';
import { UserAccountFactory } from 'factories/accounts/UserAccountFactory';
import { EventOrganizerTypeEnum, RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { EmployeeFactory } from 'factories/employees/Employee.Factory';
import { EmployeeConsent } from 'entities/employees/EmployeeConsent.Entity';
import { Employee } from 'entities/employees/Employee.Entity';
import { EmployeeAddress } from 'entities/employees/EmployeeAddress.Entity';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { EventOrganizerFactory } from 'factories/event/EventOrganizer.Factory';

export class CreateEmployeeAllData extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const extendedPersonFactory = new ExtendedPersonFactory();
        const employeeFactory = new EmployeeFactory();
        const addressFactory = new AddressFactory();
        const consentFactory = new ConsentFactory();
        const accountsFactory = new UserAccountFactory();
        const eventOrganizerFactory = new EventOrganizerFactory();

        for (let i = 0; i < AMOUNT_OF_NEW_EMPLOYEES; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, AMOUNT_OF_NEW_EMPLOYEES - i);
            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (let j = 0; j < batchSize; j++) {
                        const address = addressFactory.createWithFakeData();
                        await transactionalEntityManager.save(EmployeeAddress, address);

                        const consent = consentFactory.createWithFakeData();
                        await transactionalEntityManager.save(EmployeeConsent, consent);

                        const person = extendedPersonFactory.createWithFakeData();
                        const account = await accountsFactory.create(RolesEnum.EMPLOYEE, person);
                        await transactionalEntityManager.save(UserAccount, account);

                        const employee = employeeFactory.create(person, address, consent, account);

                        if (Math.random() < 0.5) {
                            const eventOrganizer = eventOrganizerFactory.create(EventOrganizerTypeEnum.EMPLOYEE, employee.id);
                            await transactionalEntityManager.save(EventOrganizer, eventOrganizer);

                            employee.organizer = eventOrganizer;
                        }

                        await transactionalEntityManager.save(Employee, employee);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at employee ${i}:`, error);
            }
        }
    }
}
