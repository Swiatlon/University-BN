import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError';
import { HTTP_STATUS } from 'constants/general/general.Constants';

export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        console.error('Unexpected Error:', err);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ message: HTTP_STATUS.INTERNAL_SERVER_ERROR.message });
    }
};
