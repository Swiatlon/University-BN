import { DataSource } from 'typeorm';
import { AMOUNT_OF_CREATED_COMPANIES, BATCH_SIZE, EXTERNAL_PARTICIPANTS_PER_COMPANY } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { UserAccountFactory } from 'factories/accounts/UserAccountFactory';
import { EventOrganizerTypeEnum, RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { CompanyFactory } from 'factories/companies/Company.Factory';
import { Company } from 'entities/companies/Company.Entity';
import { ExternalParticipantFactory } from 'factories/externalParticipants/ExternalParticipant.Factory';
import { BasicPersonFactory } from 'factories/persons/BasicPerson.Factory';
import { ExternalParticipant } from 'entities/externalParticipants/ExternalParticipant.Entity';
import { EventOrganizerFactory } from 'factories/event/EventOrganizer.Factory';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';

export class CreateCompanyAllData extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const basicPersonFactory = new BasicPersonFactory();
        const companyFactory = new CompanyFactory();
        const accountsFactory = new UserAccountFactory();
        const externalParicipantFactory = new ExternalParticipantFactory();
        const eventOrganizerFactory = new EventOrganizerFactory();

        for (let i = 0; i <= AMOUNT_OF_CREATED_COMPANIES; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, AMOUNT_OF_CREATED_COMPANIES - i);
            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (let j = 0; j < batchSize; j++) {
                        const companyBasicData = companyFactory.createWithFakeData();

                        const companyAccount = await accountsFactory.create(RolesEnum.COMPANY, companyBasicData.name);
                        await transactionalEntityManager.save(UserAccount, companyAccount);

                        const company = companyFactory.create(companyBasicData, companyAccount);
                        const externalParticipants: ExternalParticipant[] = [];

                        for (let k = 0; k < EXTERNAL_PARTICIPANTS_PER_COMPANY; k++) {
                            const person = basicPersonFactory.createWithFakeData();

                            const externalAccount = await accountsFactory.create(RolesEnum.EXTERNAL_PARTICIPANT, person);
                            await transactionalEntityManager.save(UserAccount, externalAccount);

                            const externalParticipant = externalParicipantFactory.create(person, externalAccount, [company]);

                            if (Math.random() < 0.5) {
                                const externalEventOrganizer = eventOrganizerFactory.create(EventOrganizerTypeEnum.EXTERNAL_PARTICIPANT, externalParticipant.id);
                                await transactionalEntityManager.save(EventOrganizer, externalEventOrganizer);

                                externalParticipant.organizer = externalEventOrganizer;
                            }

                            externalParticipants.push(externalParticipant);
                            await transactionalEntityManager.save(ExternalParticipant, externalParticipant);
                        }

                        if (Math.random() < 0.5) {
                            const companyEventOrganizer = eventOrganizerFactory.create(EventOrganizerTypeEnum.COMPANY, company.id);
                            await transactionalEntityManager.save(EventOrganizer, companyEventOrganizer);

                            company.organizer = companyEventOrganizer;
                        }

                        company.externalParticipants = externalParticipants;

                        await transactionalEntityManager.save(Company, company);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at company ${i}:`, error);
            }
        }
    }
}
