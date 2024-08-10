import express from 'express';
import { studentController } from 'controllers/Student.Controller';
import { verifyJWT } from 'middlewares/verifyJWT';

const router = express.Router();

router.get('/students/me', verifyJWT, studentController.getStudentAllData);

export default router;
