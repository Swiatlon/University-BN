import { HTTP_STATUS } from 'constants/general/general.Constants';
import type { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UserInfoService } from 'services/UserInfo.Service';
import { ICustomVisbilityFieldRequest } from 'types/global/Global.Interfaces';
import { IUserInfo } from 'types/services/Services.Interfaces';

const userInfoServices = new UserInfoService();

const getUserInfo = asyncHandler(async (req: ICustomVisbilityFieldRequest, res: Response) => {
    const userInfo = req.cookies.userInfo as IUserInfo;

    const userData = await userInfoServices.getUserInfo(userInfo);

    res.status(HTTP_STATUS.OK.code).json(userData);
});

export const UserInfoController = {
    getUserInfo,
};
