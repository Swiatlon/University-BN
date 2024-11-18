import express from 'express';
import { gradesController } from 'controllers/Grades.Controller';
import { verifyJWT } from 'middlewares/VerifyJWT';
import hasAccessToEndpointData from 'middlewares/hasAccessToEndpointData/HasAccessToEndpointData.Middleware';
import { RolesEnum } from 'constants/entities/entities.Constants';

const router = express.Router();

router.get('/:studentId', verifyJWT, hasAccessToEndpointData([RolesEnum.ADMIN, RolesEnum.STUDENT]), gradesController.getGradesByStudentId);

export default router;
