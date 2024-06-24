import { CreateStudentDto } from 'dto/students/CreateStudent.Dto';
import express from 'express';
import { studentController } from 'controllers/Student.Controller';
import { validateDto } from 'middlewares/validateDto';
import { verifyJWT } from 'middlewares/verifyJWT';

const router = express.Router();

router.post('/students', verifyJWT, validateDto(CreateStudentDto), studentController.createStudent);

export default router;
