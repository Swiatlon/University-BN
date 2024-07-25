import { Request, Response, NextFunction } from 'express';
import { getRequestContext } from 'contexts/RequestContext';

export const cleanupRequestContextMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const context = getRequestContext();

    context.run(() => {
        context.set('request', {});

        res.on('finish', () => {
            context.set('request', undefined);
        });

        next();
    });
};
