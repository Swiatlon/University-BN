import type { Request, Response } from 'express';
import { HTTP_STATUS } from 'constants/general/general.Constants';
import { gradesService } from 'services/Grades.Service';
import asyncHandler from 'express-async-handler';

const getGradesByStudentId = asyncHandler(async (req: Request, res: Response) => {
    const studentId = Number(req.params.studentId);
    const grades = await gradesService.getGradesByStudentId(studentId);

    res.status(HTTP_STATUS.OK.code).json(grades);
});

export const gradesController = {
    getGradesByStudentId,
};
