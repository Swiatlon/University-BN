import type { Request, Response } from 'express';
import { HTTP_STATUS } from '../utils/httpStatuses';
import { Student } from '../entities/studentEntity';
import asyncHandler from 'express-async-handler';

const createStudent = asyncHandler(async (req: Request, res: Response) => {
    // Const newStudent
    const _newStudent = new Student();

    console.log(req.body);

    res.status(HTTP_STATUS.CREATED.code).json('new student');
});

const getHelloWorld = asyncHandler((req: Request, res: Response) => {
    res.status(HTTP_STATUS.OK.code).send('Hello World');
});

export const studentController = {
    createStudent,
    getHelloWorld,
};
