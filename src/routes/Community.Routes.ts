import { CommunityController } from 'controllers/Community.Controller';
import express from 'express';
import { verifyJWT } from 'middlewares/verifyJWT';

const router = express.Router();

router.get('/getAllTeachers', verifyJWT, CommunityController.findAllTeachers);
// router.post('/createEvent', verifyJWT, CommunityController);

export default router;
