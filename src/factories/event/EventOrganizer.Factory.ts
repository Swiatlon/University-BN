import { EventOrganizer } from 'entities/Events/EventOrganizer.Entity';
import { EventOrganizerTypeEnum } from 'constants/entities/entities.Constants';
import { CompanyEventOrganizer } from './EventOrganizersModels/CompanyEventOrganizer';
import { ExternalEventOrganizer } from './EventOrganizersModels/ExternalEventOrganizer';
import { EmployeeEventOrganizer } from './EventOrganizersModels/EmployeeEventOrganizer';

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
