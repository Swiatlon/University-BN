import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { EventOrganizerTypeEnum } from 'constants/entities/entities.Constants';
import { IEventOrganizer } from 'types/events/Events.Interfaces';

export class EmployeeEventOrganizer extends EventOrganizer implements IEventOrganizer {
    constructor(organizerId: number) {
        super();
        this.organizerType = EventOrganizerTypeEnum.EMPLOYEE;
        this.id = organizerId;
    }
}
