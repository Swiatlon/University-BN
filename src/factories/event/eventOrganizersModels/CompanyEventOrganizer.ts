import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { EventOrganizerTypeEnum } from 'constants/entities/entities.Constants';
import { IEventOrganizer } from 'types/events/Events.Interfaces';

export class CompanyEventOrganizer extends EventOrganizer implements IEventOrganizer {
    constructor(organizerId: string) {
        super();
        this.organizerType = EventOrganizerTypeEnum.COMPANY;
        this.id = organizerId;
    }
}
