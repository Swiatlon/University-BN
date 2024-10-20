import asyncHandler from 'express-async-handler';
import type { CookieOptions, Request, Response } from 'express';
import { HTTP_STATUS, ONE_DAY, ONE_MINUTE } from 'constants/general/general.Constants';
import { ICookie } from 'types/global/Global.Interfaces';
import { ILoginCredentials, IRefreshCredentials } from 'types/controllers/Controllers.Interfaces';
import { authService } from 'services/Auth.Service';

const login = asyncHandler(async (req: Request, res: Response) => {
    const { identifier, password, rememberMe, sessionID } = req.body as ILoginCredentials;
    const { accessToken, refreshToken, userData, sessionData } = await authService.login({ identifier, password, rememberMe, sessionID });

    const cookieBaseOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: rememberMe ? ONE_DAY * 30 : ONE_MINUTE * 16,
    } as CookieOptions;

    res.cookie('jwt', refreshToken, cookieBaseOptions);
    res.cookie('session', sessionData, cookieBaseOptions);
    res.cookie('userInfo', { ...userData }, cookieBaseOptions);

    res.json({ accessToken });
});

/*--------------------------------------------------------------*/

const refresh = asyncHandler(async (req: Request, res: Response) => {
    const {
        jwt,
        session: { rememberMe, sessionID: loginSavedSessionID },
    } = req.cookies as ICookie;
    const { sessionID } = req.body as IRefreshCredentials;

    if (!jwt) {
        res.status(HTTP_STATUS.FORBIDDEN.code).json({ message: 'Unauthorized!' });
        return;
    }

    const { accessToken } = await authService.refresh(jwt, sessionID, loginSavedSessionID, rememberMe);

    res.json({ accessToken });
});
// /*--------------------------------------------------------------*/

const logout = (req: Request, res: Response) => {
    const cookies = req.cookies as ICookie;

    if (!cookies?.jwt) {
        return res.sendStatus(HTTP_STATUS.NO_CONTENT.code);
    }

    const cookieOptions = { httpOnly: true, sameSite: 'none', secure: true } as CookieOptions;

    res.clearCookie('jwt', cookieOptions);
    res.clearCookie('userInfo', cookieOptions);
    res.clearCookie('session', cookieOptions);

    res.json({ message: 'Cookie cleared' });
};

const randomUserLogin = asyncHandler(async (req: Request, res: Response) => {
    const students = await authService.findAllStudentAccounts();

    if (students.length === 0) {
        res.status(HTTP_STATUS.NOT_FOUND.code).json({ message: 'No student accounts found' });
        return;
    }

    const { sessionID } = req.body as ILoginCredentials;
    const randomIndex = Math.floor(Math.random() * students.length);
    const randomStudent = students[randomIndex];

    const { accessToken, refreshToken, userData, sessionData } = await authService.login({
        identifier: randomStudent.email,
        //Dont worry normal it wont be funcion like this
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

    res.cookie('jwt', refreshToken, cookieBaseOptions);
    res.cookie('session', sessionData, cookieBaseOptions);
    res.cookie('userInfo', { ...userData }, cookieBaseOptions);

    res.json({ accessToken });
});

export const AuthController = {
    login,
    refresh,
    logout,
    randomUserLogin,
};
