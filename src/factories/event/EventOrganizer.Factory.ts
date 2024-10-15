import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { EventOrganizerTypeEnum } from 'constants/entities/entities.Constants';
import { CompanyEventOrganizer } from './eventOrganizersModels/CompanyEventOrganizer';
import { ExternalEventOrganizer } from './eventOrganizersModels/ExternalEventOrganizer';
import { EmployeeEventOrganizer } from './eventOrganizersModels/EmployeeEventOrganizer';

export class EventOrganizerFactory {
    create(type: EventOrganizerTypeEnum, organizerId: string): EventOrganizer {
        let eventOrganizer: EventOrganizer;

        switch (type) {
            case EventOrganizerTypeEnum.COMPANY:
                eventOrganizer = new CompanyEventOrganizer(organizerId);
                break;
            case EventOrganizerTypeEnum.EXTERNAL_PARTICIPANT:
                eventOrganizer = new ExternalEventOrganizer(organizerId);
                break;
            case EventOrganizerTypeEnum.EMPLOYEE:
                eventOrganizer = new EmployeeEventOrganizer(organizerId);
                break;
            default:
                throw new Error('Unsupported entity type');
        }

        return eventOrganizer;
    }
}
