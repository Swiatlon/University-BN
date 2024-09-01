import { IEvent } from 'types/Events/Events.Interfaces';

export interface ICreateEventDto extends Omit<IEvent, 'id'> {}
