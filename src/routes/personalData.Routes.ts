import express from 'express';
import { verifyJWT } from 'middlewares/verifyJWT';
import { PersonalDataController } from 'controllers/PersonalData.Controller';

const router = express.Router();

router.get('/personalData', verifyJWT, PersonalDataController.getPersonalData);

export default router;
