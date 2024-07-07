import type { Request, Response } from 'express';
import { HTTP_STATUS } from 'constants/general/general.Constants';
import { Student } from 'entities/Students/Student.Entity';
import { StudentService } from 'services/Student.Service';
import asyncHandler from 'express-async-handler';
import { IUserInfo } from 'interfaces/Services/IServices';

const studentService = new StudentService();

const createStudent = asyncHandler(async (req: Request, res: Response) => {
    const newStudent = await studentService.createStudent(req.body as Partial<Student>);
    res.status(HTTP_STATUS.CREATED.code).json(newStudent);
});

const getStudentAllData = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.cookies.userInfo as IUserInfo;
    const studentData = await studentService.getStudentAllData(id);

    res.status(HTTP_STATUS.CREATED.code).json(studentData);
});

export const studentController = {
    createStudent,
    getStudentAllData,
};
