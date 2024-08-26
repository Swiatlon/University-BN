import { CreateEventDto } from 'dto/Events/CreateEvent.Dto';
import { EventsRepository } from 'repositories/Events/Event.Repository';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';
import { ICommunityService } from 'types/Services/Services.Interfaces';

export class CommunityService implements ICommunityService {
    async getAllTeachers() {
        return await EmployeeRepository().getAllTeachers();
    }

    async getEvents() {
        return await EventsRepository().getAllEvents();
    }

    async getEventById(eventId: string) {
        return await EventsRepository().getEventById(eventId);
    }

    async createEvent(createEventDto: CreateEventDto) {
        return await EventsRepository().saveEvent(createEventDto);
    }

    async updateEvent(eventId: string, updateEventDto: CreateEventDto) {
        return await EventsRepository().updateEvent(eventId, updateEventDto);
    }

    async deleteEvent(eventId: string): Promise<boolean> {
        return await EventsRepository().deleteEvent(eventId);
    }
}
