import { DataSource } from 'typeorm';
import { AMOUNT_OF_CREATED_PARTICIPANTS, BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { UserAccountFactory } from 'factories/accounts/UserAccountFactory';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { BasicPersonFactory } from 'factories/persons/BasicPerson.Factory';
import { ExternalParticipantFactory } from 'factories/externalParticipants/ExternalParticipant.Factory';
import { ExternalParticipant } from 'entities/externalParticipants/ExternalParticipant.Entity';

export class CreateExternalParticipantAllData extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const basicPersonFactory = new BasicPersonFactory();
        const accountsFactory = new UserAccountFactory();
        const externalParicipantFactory = new ExternalParticipantFactory();

        for (let i = 0; i < AMOUNT_OF_CREATED_PARTICIPANTS; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, AMOUNT_OF_CREATED_PARTICIPANTS - i);
            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (let j = 0; j < batchSize; j++) {
                        const person = basicPersonFactory.createWithFakeData();

                        const account = await accountsFactory.create(RolesEnum.EXTERNAL_PARTICIPANT, person);
                        await transactionalEntityManager.save(UserAccount, account);

                        const externalParticipant = externalParicipantFactory.create(person, account);
                        await transactionalEntityManager.save(ExternalParticipant, externalParticipant);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at participant ${i}:`, error);
            }
        }
    }
}
