import { EventOrganizerTypeEnum } from 'constants/entities/entities.Constants';
import { Event } from 'entities/events/Event.Entity';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';

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
