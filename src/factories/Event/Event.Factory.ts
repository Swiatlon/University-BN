import { Faker, faker } from '@faker-js/faker';
import { Event } from 'entities/Events/Event.Entity';
import { IEvent } from 'types/Events/Events.Interfaces';
import { IEventFactory } from 'types/Factories/Factory.Interfaces';

export class EventFactory implements IEventFactory {
    private faker: Faker = faker;

    create(event: IEvent): Event {
        const newEvent = new Event();
        newEvent.title = event.title;
        newEvent.startDate = event.startDate;
        newEvent.endDate = event.endDate;
        newEvent.description = event.description;

        return event;
    }

    createWithFakeData(): Event {
        const newEvent = new Event();

        newEvent.title = this.faker.lorem.sentence();
        newEvent.startDate = this.faker.date.future();
        newEvent.endDate = this.faker.date.future();
        newEvent.description = this.faker.lorem.paragraph();

        return newEvent;
    }
}
