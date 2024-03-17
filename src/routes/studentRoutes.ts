import { CreateStudentDto } from '../dto/students/CreateStudentDto';
import express from 'express';
import { studentController } from '../controllers/studentController';
import { validateDto } from '../middlewares/validateDto';

const router = express.Router();

router.post('/students', validateDto(CreateStudentDto), studentController.createStudent);

export default router;
