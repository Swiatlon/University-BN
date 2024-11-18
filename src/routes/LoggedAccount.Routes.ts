import express from 'express';
import { LoggedAccountController } from 'controllers/LoggedAccount.Controller';
import { verifyJWT } from 'middlewares/VerifyJWT';

const router = express.Router();

router.get('/basic-data', verifyJWT, LoggedAccountController.getLoggedAccountBasicData);

export default router;
