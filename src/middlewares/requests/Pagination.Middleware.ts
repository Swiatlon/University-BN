import { getRequestContext } from 'contexts/RequestContext';
import { Request, Response, NextFunction } from 'express';
import { IRequestParams } from 'types/requests/Requests.Interfaces';

export const paginationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const context = getRequestContext();

    context.run(() => {
        const reqQuery = req.query as IRequestParams;
        const { pagination } = reqQuery;

        if (pagination) {
            const { page = 1, pageSize = 10_000 } = pagination;

            reqQuery.pagination = {
                page: Number(page),
                pageSize: Number(pageSize),
            };
        }

        context.set('request', reqQuery);
        next();
    });
};
