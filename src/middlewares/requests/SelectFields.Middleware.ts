import { getRequestContext } from 'contexts/RequestContext';
import { Request, Response, NextFunction } from 'express';
import { IRequestParams } from 'types/requests/Requests.Interfaces';

export const selectFieldsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const context = getRequestContext();

    context.run(() => {
        const reqQuery = req.query as IRequestParams;
        const { selectFields } = reqQuery;

        if (selectFields) {
            reqQuery.selectFields = selectFields.map((field) => field.trim());
        }

        context.set('request', reqQuery);
        next();
    });
};
