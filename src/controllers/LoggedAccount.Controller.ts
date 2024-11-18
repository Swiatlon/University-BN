import { HTTP_STATUS } from 'constants/general/general.Constants';
import type { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { loggedAccountService } from 'services/LoggedAccount.Service';
import { ICookie, ICustomVisbilityFieldRequest } from 'types/global/Global.Interfaces';

const getLoggedAccountBasicData = asyncHandler(async (req: ICustomVisbilityFieldRequest, res: Response) => {
    const { loggedUserData } = req.cookies as ICookie;
    const userData = await loggedAccountService.getLoggedAccountData(loggedUserData);

    res.status(HTTP_STATUS.OK.code).json(userData);
});

export const LoggedAccountController = {
    getLoggedAccountBasicData,
};
