import type { Request, Response } from 'express';
import { HTTP_STATUS } from 'constants/general/general.Constants';
import { GradesService } from 'services/Grades.Service';
import asyncHandler from 'express-async-handler';
import { StudentService } from 'services/Student.Service';
import { IUserInfo } from 'types/services/Services.Interfaces';

const gradesService = new GradesService();
const studentService = new StudentService();

const getGradesByStudentId = asyncHandler(async (req: Request, res: Response) => {
    const { accountId } = req.cookies.userInfo as IUserInfo;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const studentId = await studentService.getStudentIdByAccountId(accountId);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const grades = await gradesService.getGradesByStudentId(studentId);
    res.status(HTTP_STATUS.OK.code).json(grades);
});

export const gradesController = {
    getGradesByStudentId,
};
