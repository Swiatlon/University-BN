import { HTTP_STATUS } from 'constants/general/general.Constants';
import type { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PersonalDataService } from 'services/PersonalData.Service';
import { ICustomVisbilityFieldRequest } from 'types/Global/Global.Interfaces';
import { IUserInfo } from 'types/Services/Services.Interfaces';

const personalDataService = new PersonalDataService();

const getPersonalData = asyncHandler(async (req: ICustomVisbilityFieldRequest, res: Response) => {
    const userInfo = req.cookies.userInfo as IUserInfo;

    const userData = await personalDataService.getUserAllData(userInfo);

    res.status(HTTP_STATUS.OK.code).json(userData);
});

export const PersonalDataController = {
    getPersonalData,
};
