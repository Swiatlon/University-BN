import express from 'express';
import { gradesController } from 'controllers/Grades.Controller';
import { verifyJWT } from 'middlewares/verifyJwt/verifyJWT';
import hasAccessToEndpointData from 'middlewares/hasAccessToEndpointData/HasAccessToEndpointData.Middleware';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { Student } from 'entities/students/Student.Entity';

const router = express.Router();

router.get('/:id', verifyJWT, hasAccessToEndpointData([RolesEnum.ADMIN, RolesEnum.STUDENT], Student), gradesController.getGradesByStudentId);

export default router;
