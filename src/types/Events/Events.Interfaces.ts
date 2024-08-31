import { EventOrganizerTypeEnum } from 'constants/entities/entities.Constants';
import { Event } from 'entities/Events/Event.Entity';
import { EventOrganizer } from 'entities/Events/EventOrganizer.Entity';

export interface IEventOrganizer {
    id: string;
    organizerType: EventOrganizerTypeEnum;
    events: Event[];
}

export interface IEvent {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
    organizators: EventOrganizer[];
    author: EventOrganizer;
}
