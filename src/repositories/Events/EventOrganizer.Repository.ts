import { DataSource } from 'typeorm';
import { EventOrganizer } from 'entities/Events/EventOrganizer.Entity';

export const EventOrganizerRepository = (dataSource: DataSource) => {
    return dataSource.getRepository(EventOrganizer).extend({
        async findOneRandom(): Promise<EventOrganizer | null> {
            const count = await this.count();

            if (count === 0) {
                return null;
            }

            const randomOffset = Math.floor(Math.random() * count);

            return this.createQueryBuilder('eventOrganizer').skip(randomOffset).take(1).getOne();
        },

        async findByIds(ids: string[]): Promise<EventOrganizer[]> {
            return this.createQueryBuilder('eventOrganizer').where('eventOrganizer.id IN (:...ids)', { ids }).getMany();
        },
    });
};
