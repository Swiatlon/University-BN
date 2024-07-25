import type { Request, Response } from 'express';
import { HTTP_STATUS } from 'constants/general/general.Constants';
import asyncHandler from 'express-async-handler';
import { CommunityService } from 'services/Community.Service';

const communityService = new CommunityService();

const findAllTeachers = asyncHandler(async (req: Request, res: Response) => {
    const teachers = await communityService.getAllTeachers();

    res.status(HTTP_STATUS.OK.code).json(teachers);
});

export const CommunityController = {
    findAllTeachers,
};
