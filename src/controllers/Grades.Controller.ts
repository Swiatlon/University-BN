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
    const studentId = req.params.id;

    const studentAccountId = await studentService.getAccountIdByStudentId(studentId);

    if (studentAccountId !== accountId) {
        res.status(HTTP_STATUS.FORBIDDEN.code).json({ message: 'Access denied.' });
        return;
    }

    const grades = await gradesService.getGradesByStudentId(studentId);
    res.status(HTTP_STATUS.OK.code).json(grades);
});

export const gradesController = {
    getGradesByStudentId,
};
