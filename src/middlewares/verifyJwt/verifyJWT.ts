import jwt from 'jsonwebtoken';
import { Response, NextFunction, Request } from 'express';
import { HTTP_STATUS } from 'constants/general/general.Constants';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization ?? req.headers.Authorization;

    if (typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
        res.status(HTTP_STATUS.UNAUTHORIZED.code).json({ message: 'Unauthorized' });
        return;
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err: unknown) => {
        if (err) {
            res.status(HTTP_STATUS.FORBIDDEN.code).json({ message: 'Token expired!' });
            return;
        }
        next();
    });
};
