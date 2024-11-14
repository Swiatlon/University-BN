import { CreateEventDto } from 'dto/events/CreateEvent.Dto';
import { EventsRepository } from 'repositories/events/Event.Repository';
import { EmployeeRepository } from 'repositories/persons/Employee.Repository';
import { ICommunityService } from 'types/services/Services.Interfaces';
import { EventOrganizerRepository } from 'repositories/events/EventOrganizer.Repository';

export class CommunityService implements ICommunityService {
    async getAllTeachers() {
        return await EmployeeRepository().getAllTeachers();
    }

    async getEvents() {
        return await EventsRepository().getAllEvents();
    }

    async getEventById(eventId: number) {
        return await EventsRepository().getEventById(eventId);
    }

    async createEvent(createEventDto: CreateEventDto) {
        return await EventsRepository().saveEvent(createEventDto);
    }

    async updateEvent(eventId: number, updateEventDto: CreateEventDto) {
        return await EventsRepository().updateEvent(eventId, updateEventDto);
    }

    async deleteEvent(eventId: number): Promise<boolean> {
        return await EventsRepository().deleteEvent(eventId);
    }

    async getAllEventOrganizers() {
        return await EventOrganizerRepository().getAllEventOrganizers();
    }
}

export const communityService = new CommunityService();
