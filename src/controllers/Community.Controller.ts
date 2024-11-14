import type { Request, Response } from 'express';
import { HTTP_STATUS } from 'constants/general/general.Constants';
import asyncHandler from 'express-async-handler';
import { communityService } from 'services/Community.Service';
import { CreateEventDto } from 'dto/events/CreateEvent.Dto';

const getAllTeachers = asyncHandler(async (req: Request, res: Response) => {
    const teachers = await communityService.getAllTeachers();

    res.status(HTTP_STATUS.OK.code).json(teachers);
});

const getEvents = asyncHandler(async (req: Request, res: Response) => {
    const events = await communityService.getEvents();
    res.status(HTTP_STATUS.OK.code).json(events);
});

const getEventById = asyncHandler(async (req: Request, res: Response) => {
    const event = await communityService.getEventById(Number(req.params.id));
    res.status(HTTP_STATUS.OK.code).json(event);
});

const createEvent = asyncHandler(async (req: Request, res: Response) => {
    const newEvent = await communityService.createEvent(req.body as CreateEventDto);
    res.status(HTTP_STATUS.CREATED.code).json(newEvent);
});

const getAllEventOrganizers = asyncHandler(async (req: Request, res: Response) => {
    const organizers = await communityService.getAllEventOrganizers();
    res.status(HTTP_STATUS.OK.code).json(organizers);
});

const updateEvent = asyncHandler(async (req: Request, res: Response) => {
    const updatedEvent = await communityService.updateEvent(Number(req.params.id), req.body as CreateEventDto);

    if (!updateEvent) {
        res.status(HTTP_STATUS.NOT_FOUND.code).json({ message: 'Event not found' });
        return;
    }

    res.status(HTTP_STATUS.OK.code).json(updatedEvent);
});

const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
    const wasDeleted = await communityService.deleteEvent(Number(req.params.id));

    if (!wasDeleted) {
        res.status(HTTP_STATUS.NOT_FOUND.code).json({ message: 'Event not found' });
        return;
    }

    res.status(HTTP_STATUS.OK.code).json({ message: 'Event deleted' });
});

export const CommunityController = {
    getEvents,
    getEventById,
    getAllTeachers,
    createEvent,
    updateEvent,
    deleteEvent,
    getAllEventOrganizers,
};
