import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import type { Request, Response } from 'express';
import { accountRepository } from 'repositories/AccountsRepository';
import { HTTP_STATUS } from 'constants/general/generalConstants';
import { ICookie, UserPayload } from 'interfaces/ICookie';

// @desc Login
// @route POST /auth
// @access Public

const accessTokenTime = '15s';

const login = asyncHandler(async (req: Request, res: Response) => {
    const { identifier, password } = req.body as { identifier: string; password: string };

    const foundUser = await accountRepository().findByAccountIdentifier(identifier);

    if (!foundUser) {
        res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'User not exist!' });
        return;
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Password or identifier not correct!' });
        return;
    }

    // After everything is correct we set JWT Tokens

    const accessToken = jwt.sign(
        {
            UserInfo: {
                email: foundUser.email,
                login: foundUser.login,
                id: foundUser.id,
            },
        },
        String(process.env.ACCESS_TOKEN_SECRET),
        { expiresIn: accessTokenTime }
    );

    const refreshToken = jwt.sign(
        {
            email: foundUser.email,
            login: foundUser.login,
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

    res.cookie('jwt', refreshToken, {
        httpOnly: true, // accessible only by web server
        secure: true, // https
        sameSite: 'strict', // cross-site cookie
        maxAge: sevenDays, // cookie expiry: set to match refreshToken
    });

    res.json({ accessToken });
});
/*--------------------------------------------------------------*/

// @desc Refresh
// @route POST /auth/refresh
// @access Public

const refresh = asyncHandler(async (req: Request, res: Response) => {
    const { cookies } = req as { cookies: ICookie };

    if (!cookies?.jwt) {
        res.status(HTTP_STATUS.FORBIDDEN.code).json({ message: 'Unauthorized!' });
        return;
    }

    const refreshToken = cookies.jwt;

    const decoded = await new Promise<UserPayload>((resolve, reject) => {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, decodedToken) => {
            if (err) {
                reject(err);
            } else {
                resolve(decodedToken as UserPayload);
            }
        });
    });

    const foundUser = await accountRepository().findByEmailAccount(decoded.email);

    if (!foundUser) {
        res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Unauthorized' });
        return;
    }

    const accessToken = jwt.sign(
        {
            UserInfo: {
                email: foundUser.email,
                login: foundUser.login,
                id: foundUser.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: accessTokenTime }
    );

    res.json({ accessToken });
});
// /*--------------------------------------------------------------*/

// @desc Logout
// @route POST /auth/logout
// @access Public

const logout = (req: Request, res: Response) => {
    const { cookies } = req as { cookies: ICookie };

    if (!cookies?.jwt) {
        return res.sendStatus(HTTP_STATUS.NO_CONTENT.code); // No content
    }
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'strict', secure: true });

    return res.json({ message: 'Cookie cleared' });
};

export const AuthController = {
    login,
    refresh,
    logout,
};
