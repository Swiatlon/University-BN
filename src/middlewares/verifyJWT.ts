import jwt from 'jsonwebtoken'; // Note the change here, it should be 'import ... from', not 'import { jwt } from'
import { Request, Response, NextFunction } from 'express';
import { HTTP_STATUS } from 'constants/general/generalConstants';

interface JwtPayload {
    UserInfo: {
        username: string;
    };
}

interface CustomRequest extends Request {
    user?: string;
}

export const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization ?? req.headers.Authorization;

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Unauthorized' });
        return;
    }

    // eslint-disable-next-line no-magic-numbers
    const token = authHeader.split(' ')[1];

    jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err: unknown, decoded: unknown) => {
        if (err) {
            res.status(HTTP_STATUS.FORBIDDEN.code).json({ message: 'Token expired!' });
            return;
        }

        const safeDecoded = decoded as JwtPayload;

        req.user = safeDecoded.UserInfo.username;
        next();
    });
};
