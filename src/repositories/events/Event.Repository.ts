import { DataSource } from 'typeorm';
import { Event } from 'entities/events/Event.Entity';
import { AppDataSource } from 'configs/database';
import { CreateEventDto } from 'dto/events/CreateEvent.Dto';

export const EventsRepository = (dataSource: DataSource = AppDataSource) => {
    return dataSource.getRepository(Event).extend({
        async getAllEvents(): Promise<Event[]> {
            return this.createQueryBuilder('event').getMany();
        },

        async getEventById(eventId: number): Promise<Event | null> {
            return this.createQueryBuilder('event').leftJoinAndSelect('event.organizators', 'organizer').where('event.id = :id', { id: eventId }).getOne();
        },

        async findByOrganizer(organizerId: number): Promise<Event[]> {
            return this.createQueryBuilder('event')
                .innerJoin('event.organizators', 'organizer')
                .where('organizer.id = :organizerId', { organizerId })
                .getMany();
        },

        async saveEvent(createEventDto: CreateEventDto): Promise<Event> {
            const event = this.create(createEventDto);

            return await this.save(event);
        },

        async updateEvent(eventId: number, updateEventDto: Partial<CreateEventDto>): Promise<Event | null> {
            const { organizators, ...updateData } = updateEventDto;

            await this.update({ id: Number(eventId) }, updateData);

            if (organizators) {
                const event = await this.findOne({ where: { id: Number(eventId) }, relations: ['organizators'] });

                if (event) {
                    event.organizators = organizators;
                    await this.save(event);
                }
            }

            return await this.createQueryBuilder('event').where('event.id = :id', { id: eventId }).getOne();
        },

        async deleteEvent(eventId: number): Promise<boolean> {
            const event = await this.findOne({ where: { id: Number(eventId) }, relations: ['organizators'] });

            if (!event) {
                return false;
            }

            await this.remove(event);

            return true;
        },
    });
};
