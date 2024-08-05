import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import type { CookieOptions, Request, Response } from 'express';
import { ACCESS_TOKEN_TIME, HTTP_STATUS } from 'constants/general/general.Constants';
import { AccountRepository } from 'repositories/Accounts/Accounts.Repository';
import { UserRepository } from 'repositories/Accounts/User.Repository';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { ICookie, IUserPayload } from 'types/Global/Global.Interfaces';

const login = asyncHandler(async (req: Request, res: Response) => {
    const { identifier, password } = req.body as { identifier: string; password: string };

    const foundUser = await AccountRepository().findByIdentifierAccount(identifier);

    if (!foundUser) {
        res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Password or identifier not correct!' });
        return;
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Password or identifier not correct!' });
        return;
    }

    const accessToken = jwt.sign({}, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: ACCESS_TOKEN_TIME });

    const refreshToken = jwt.sign(
        {
            email: foundUser.email,
        },
        String(process.env.REFRESH_TOKEN_SECRET),
        { expiresIn: '1d' }
    );

    const time = {
        days: 1,
        hours: 24,
        minutes: 60,
        seconds: 60,
        miliSeconds: 1000,
    };

    const sevenDays = time.days * time.hours * time.minutes * time.seconds * time.miliSeconds;

    const cookieOptions = {
        httpOnly: true, // accessible only by web server
        secure: true, // https
        sameSite: 'strict', // cross-site cookie
        maxAge: sevenDays, // cookie expiry: set to match refreshToken
    } as CookieOptions;

    const userData = {
        id: '',
        roles: foundUser.roles,
        queryRole: foundUser.roles.map((role) => role.name).includes(RolesEnum.student) ? RolesEnum.student : RolesEnum.employee,
        mainRole: foundUser.roles[0].name,
    };

    if (userData.queryRole) {
        await UserRepository({ queryRole: userData.queryRole })
            .findUserByAccountId(foundUser.id)
            .then((res) => (userData.id = res?.id as string));
    }

    res.cookie('jwt', refreshToken, cookieOptions);
    res.cookie(
        'userInfo',
        {
            ...userData,
        },
        cookieOptions
    );

    res.json({ accessToken });
});
/*--------------------------------------------------------------*/

const refresh = asyncHandler(async (req: Request, res: Response) => {
    const { cookies } = req as { cookies: ICookie };

    if (!cookies?.jwt) {
        res.status(HTTP_STATUS.FORBIDDEN.code).json({ message: 'Unauthorized!' });
        return;
    }

    const refreshToken = cookies.jwt;

    const decoded = await new Promise<IUserPayload>((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, decodedToken) => {
            if (err) {
                reject(err);
            } else {
                resolve(decodedToken as IUserPayload);
            }
        });
    });

    const foundUser = await AccountRepository().findByEmailAccount(decoded.email);

    if (!foundUser) {
        res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Unauthorized' });
        return;
    }

    const accessToken = jwt.sign({}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: ACCESS_TOKEN_TIME });

    res.json({ accessToken });
});
// /*--------------------------------------------------------------*/

const logout = (req: Request, res: Response) => {
    const { cookies } = req as { cookies: ICookie };

    if (!cookies?.jwt) {
        return res.sendStatus(HTTP_STATUS.NO_CONTENT.code); // No content
    }

    const cookieOptions = { httpOnly: true, sameSite: 'strict', secure: true } as CookieOptions;

    res.clearCookie('jwt', cookieOptions);
    res.clearCookie('userInfo', cookieOptions);

    return res.json({ message: 'Cookie cleared' });
};

export const AuthController = {
    login,
    refresh,
    logout,
};
