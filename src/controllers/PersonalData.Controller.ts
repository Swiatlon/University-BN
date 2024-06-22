import { HTTP_STATUS } from 'constants/general/general.Constants';
import type { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UserInfo } from 'services/UserInfo.Service';
import type { CustomRequest } from 'middlewares/visibilityFieldsFilters';
import { PersonalDataService } from 'services/PersonalData.Service';

const personalDataService = new PersonalDataService();

const getPersonalData = asyncHandler(async (req: CustomRequest, res: Response) => {
    const userInfo = req.cookies.userInfo as UserInfo;

    const userData = await personalDataService.getUserAllData(userInfo);

    res.status(HTTP_STATUS.OK.code).json(userData);
});

export const PersonalDataController = {
    getPersonalData,
};
