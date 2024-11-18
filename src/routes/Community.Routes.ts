import { CommunityController } from 'controllers/Community.Controller';
import { CreateEventDto } from 'dto/events/CreateEvent.Dto';
import express from 'express';
import { validateDto } from 'middlewares/ValidateDto';
import { verifyJWT } from 'middlewares/VerifyJWT';

const router = express.Router();

router.get('/getAllTeachers', verifyJWT, CommunityController.getAllTeachers);

router.get('/eventOrganizers', verifyJWT, CommunityController.getAllEventOrganizers);

router.route('/events').get(verifyJWT, CommunityController.getEvents).post(verifyJWT, validateDto(CreateEventDto), CommunityController.createEvent);

router
    .route('/events/:id')
    .get(verifyJWT, CommunityController.getEventById)
    .put(verifyJWT, validateDto(CreateEventDto), CommunityController.updateEvent)
    .delete(verifyJWT, CommunityController.deleteEvent);

export default router;
