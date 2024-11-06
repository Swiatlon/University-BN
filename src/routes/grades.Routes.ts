import express from 'express';
import { gradesController } from 'controllers/Grades.Controller';
import { verifyJWT } from 'middlewares/verifyJWT';

const router = express.Router();

router.get('/grades/:id', verifyJWT, gradesController.getGradesByStudentId);

export default router;
