import type { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HTTP_STATUS } from 'constants/general/general.Constants';
import { ICustomError } from 'types/global/Global.Interfaces';

const errorHandler: ErrorRequestHandler = (err: ICustomError, req: Request, res: Response, _next: NextFunction) => {
    const status = err?.statusCode ?? res?.statusCode ?? HTTP_STATUS.INTERNAL_SERVER_ERROR.code;

    res.status(status).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
        isError: true,
    });
};

export default errorHandler;
