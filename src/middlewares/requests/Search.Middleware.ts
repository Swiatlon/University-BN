import { getRequestContext } from 'contexts/RequestContext';
import { Request, Response, NextFunction } from 'express';
import { IRequestParams } from 'types/requests/Requests.Interfaces';
import { TSearchQuery } from 'types/requests/Requests.Types';

export const searchMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const context = getRequestContext();

    context.run(() => {
        const reqQuery = req.query as IRequestParams;
        const { search } = reqQuery;

        if (search && search.lookupText) {
            let searchQuery: TSearchQuery;

            if (search.searchAllFields) {
                searchQuery = {
                    lookupText: search.lookupText,
                    searchAllFields: true,
                };
            } else {
                searchQuery = {
                    lookupText: search.lookupText,
                    fields: search.fields ?? [],
                };
            }

            reqQuery.search = searchQuery;
        }

        context.set('request', reqQuery);
        next();
    });
};
