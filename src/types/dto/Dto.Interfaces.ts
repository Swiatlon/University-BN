import { IEvent } from 'types/events/Events.Interfaces';

export interface ICreateEventDto extends Omit<IEvent, 'id'> {}
