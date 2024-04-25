import express from 'express';
import { UserInfoController } from 'controllers/UserInfoController';
import { verifyJWT } from 'middlewares/verifyJWT';

const router = express.Router();

router.get('/userInfo', verifyJWT, UserInfoController.getUserInfo);

export default router;
