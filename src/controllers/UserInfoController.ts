import { HTTP_STATUS } from 'constants/general/generalConstants';
import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UserInfo } from 'services/UserInfoService';
import { UserInfoService } from 'services/UserInfoService';

const userInfoServices = new UserInfoService();

const getUserInfo = asyncHandler(async (req: Request, res: Response) => {
    const userInfo = req.cookies.userInfo as UserInfo;

    const userData = await userInfoServices.getUserInfo(userInfo);

    res.status(HTTP_STATUS.OK.code).json(userData);
});

export const UserInfoController = {
    getUserInfo,
};
