import { HTTP_STATUS } from 'constants/general/general.Constants';
import asyncHandler from 'express-async-handler';
import { studentService } from 'services/Students.Service';

const getStudentAllData = asyncHandler(async (req, res) => {
    const studentId = Number(req.params.studentId);
    const studentData = await studentService.getStudentAllData(studentId);

    res.status(HTTP_STATUS.OK.code).json(studentData);
});

export const studentController = {
    getStudentAllData,
};
