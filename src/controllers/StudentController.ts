import type { Request, Response } from 'express';
import { HTTP_STATUS } from 'constants/general/generalConstants';
import { Student } from 'entities/Students/Student.Entity';
import { StudentService } from '@services/StudentService';
import asyncHandler from 'express-async-handler';

const studentService = new StudentService();

const createStudent = asyncHandler(async (req: Request, res: Response) => {
    const newStudent = await studentService.createStudent(req.body as Partial<Student>);
    res.status(HTTP_STATUS.CREATED.code).json(newStudent);
});

export const studentController = {
    createStudent,
};
