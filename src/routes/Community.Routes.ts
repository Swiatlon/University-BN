import { CommunityController } from 'controllers/Community.Controller';
import express from 'express';
// import { verifyJWT } from 'middlewares/verifyJWT';

const router = express.Router();

router.get('/getAllTeachers', CommunityController.findAllTeachers);

export default router;
