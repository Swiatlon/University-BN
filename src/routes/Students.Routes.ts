import express from 'express';
import { studentController } from 'controllers/Students.Controller';
import { verifyJWT } from 'middlewares/verifyJwt/verifyJWT';
import { RolesEnum } from 'constants/entities/entities.Constants';
import hasAccessToEndpointData from 'middlewares/hasAccessToEndpointData/HasAccessToEndpointData.Middleware';

const router = express.Router();

router.get('/allData/:studentId', verifyJWT, hasAccessToEndpointData([RolesEnum.ADMIN, RolesEnum.STUDENT]), studentController.getStudentAllData);

export default router;
