import { AMOUNT_OF_CREATED_EVENTS, BATCH_SIZE } from 'constants/seeders/seeder.Constants';
import { EventFactory } from 'factories/Event/Event.Factory';
import { Event } from 'entities/Events/Event.Entity';
import { EventOrganizerRepository } from 'repositories/Events/EventOrganizer.Repository';
import { CustomSeederWithTimer } from 'seeds/CustomSeederWithTimer';
import { DataSource } from 'typeorm';

export class CreateEvents extends CustomSeederWithTimer {
    public async seed(dataSource: DataSource): Promise<void> {
        const eventFactory = new EventFactory();

        for (let i = 0; i < AMOUNT_OF_CREATED_EVENTS; i += BATCH_SIZE) {
            const batchSize = Math.min(BATCH_SIZE, AMOUNT_OF_CREATED_EVENTS - i);
            try {
                await dataSource.transaction(async (transactionalEntityManager) => {
                    for (let j = 0; j < batchSize; j++) {
                        const event = eventFactory.createWithFakeData();
                        const organizer = await EventOrganizerRepository(dataSource).findOneRandom();

                        if (!organizer) {
                            console.error(`Could not find a valid organizer for event ${event.title}`);
                            continue;
                        }

                        event.organizators = [organizer];
                        await transactionalEntityManager.save(Event, event);
                    }
                });
            } catch (error) {
                console.error(`Error processing batch starting at event ${i}:`, error);
            }
        }
    }
}
