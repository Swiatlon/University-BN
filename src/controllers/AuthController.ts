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

const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string; password: string };

    const foundUser = await accountRepository().findByEmailAccount(email);

    if (!foundUser) {
        res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'User not exist!' });
        return;
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Password or email not correct!' });
        return;
    }

    // After everything is correct we set JWT Tokens

    const accessToken = jwt.sign(
        {
            UserInfo: {
                email: foundUser.email,
                id: foundUser.id,
            },
        },
        String(process.env.ACCESS_TOKEN_SECRET),
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        {
            email: foundUser.email,
        },
        String(process.env.REFRESH_TOKEN_SECRET),
        { expiresIn: '7d' }
    );

    const time = {
        days: 7,
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

// @desc Create new user
// @route POST auth/register
// @access Public

// const createNewUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     // Confirm data
//     if (!email || !password) return res.status(400).json({ message: 'All fields are required!' });

//     // Check for duplicate

//     const duplicate = await User.findOne({ email }).lean().exec();

//     if (duplicate) return res.status(409).json({ message: 'User with this email exists' });

//     // hash password
//     const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

//     // get username  ? Maybe in schema model create ?

//     const name = email.split('@')[0];

//     const userObject = { email, password: hashedPwd, name };

//     // Create and store new user

//     const user = await User.create(userObject);

//     if (!user) return res.status(400).json({ message: 'Invalid user data received' });

//     return res.status(201).json({ message: `New user ${name} created` });
// });
// /*--------------------------------------------------------------*/

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
                id: foundUser.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '15m' }
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
