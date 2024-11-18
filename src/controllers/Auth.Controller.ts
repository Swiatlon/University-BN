import asyncHandler from 'express-async-handler';
import type { CookieOptions, Request, Response } from 'express';
import { HTTP_STATUS, ONE_DAY, ONE_MINUTE } from 'constants/general/general.Constants';
import { ICookie } from 'types/global/Global.Interfaces';
import { ILoginCredentials, IRefreshCredentials } from 'types/controllers/Controllers.Interfaces';
import { authService } from 'services/Auth.Service';
import { AccountRepository } from 'repositories/accounts/Accounts.Repository';
import { ApiError } from 'middlewares/apiErrors/ApiError';

const login = asyncHandler(async (req: Request, res: Response) => {
    const { identifier, password, rememberMe, sessionID } = req.body as ILoginCredentials;
    const { accessToken, refreshToken, userData, sessionData } = await authService.login({ identifier, password, rememberMe, sessionID });

    const cookiesOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: rememberMe ? ONE_DAY * 30 : ONE_MINUTE * 16,
    } as CookieOptions;

    res.cookie('refreshToken', refreshToken, cookiesOptions);
    res.cookie('sessionData', sessionData, cookiesOptions);
    res.cookie('loggedUserData', { ...userData }, cookiesOptions);

    res.json({ accessToken });
});

const refreshSession = asyncHandler(async (req: Request, res: Response) => {
    const {
        refreshToken,
        sessionData: { rememberMe, sessionID: loginSavedSessionID },
    } = req.cookies as ICookie;
    const { sessionID } = req.body as IRefreshCredentials;

    if (!refreshToken) {
        throw new ApiError(HTTP_STATUS.FORBIDDEN.code, 'Unauthorized!');
    }

    const { accessToken } = await authService.refreshSession({ refreshToken, sessionID, loginSavedSessionID, rememberMe });

    res.json({ accessToken });
});

const logout = (req: Request, res: Response) => {
    const cookies = req.cookies as ICookie;

    if (!cookies?.refreshToken) {
        throw new ApiError(HTTP_STATUS.NO_CONTENT.code, '');
    }

    const cookieOptions = { httpOnly: true, sameSite: 'none', secure: true } as CookieOptions;

    res.clearCookie('refreshToken', cookieOptions);
    res.clearCookie('userInfo', cookieOptions);
    res.clearCookie('session', cookieOptions);

    res.json({ message: 'Cookie cleared' });
};

const randomUserLogin = asyncHandler(async (req: Request, res: Response) => {
    const allStudentsAccount = await AccountRepository().getAllStudentAccounts();
    const studentsAmount = allStudentsAccount.length;

    if (studentsAmount === 0) {
        throw new ApiError(HTTP_STATUS.NOT_FOUND.code, 'Something went wrong...');
    }

    const { sessionID } = req.body as ILoginCredentials;
    const randomIndex = Math.floor(Math.random() * studentsAmount);
    const randomStudentAccount = allStudentsAccount[randomIndex];

    const { accessToken, refreshToken, userData, sessionData } = await authService.login({
        identifier: randomStudentAccount.email,
        password: 'wiercik',
        rememberMe: false,
        sessionID: sessionID,
    });

    const cookieBaseOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: ONE_MINUTE * 16,
    } as CookieOptions;

    res.cookie('refreshToken', refreshToken, cookieBaseOptions);
    res.cookie('sessionData', sessionData, cookieBaseOptions);
    res.cookie('loggedUserData', { ...userData }, cookieBaseOptions);

    res.json({ accessToken });
});

export const AuthController = {
    login,
    logout,
    refreshSession,
    randomUserLogin,
};
