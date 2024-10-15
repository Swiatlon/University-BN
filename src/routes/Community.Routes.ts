import { CommunityController } from 'controllers/Community.Controller';
import { CreateEventDto } from 'dto/events/CreateEvent.Dto';
import express from 'express';
import { validateDto } from 'middlewares/validateDto';
import { verifyJWT } from 'middlewares/verifyJWT';

const router = express.Router();

router.get('/getAllTeachers', verifyJWT, CommunityController.findAllTeachers);

router.get('/eventOrganizers', verifyJWT, CommunityController.getAllEventOrganizers);

router.route('/events').get(verifyJWT, CommunityController.getEvents).post(verifyJWT, validateDto(CreateEventDto), CommunityController.createEvent);

router
    .route('/events/:id')
    .get(verifyJWT, CommunityController.getEventById)
    .put(verifyJWT, validateDto(CreateEventDto), CommunityController.updateEvent)
    .delete(verifyJWT, CommunityController.deleteEvent);

export default router;
