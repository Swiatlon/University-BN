import { createNamespace, Namespace } from 'cls-hooked';
import { Request, Response, NextFunction } from 'express';

export const requestContext: Namespace = createNamespace('request-context');

export interface CustomRequest extends Request {
    selectFields?: string[];
}

export const visibilityFieldsFilter = (req: CustomRequest, res: Response, next: NextFunction): void => {
    requestContext.run(() => {
        if (typeof req.query.visibilityFields === 'string') {
            const fieldsArray: string[] = req.query.visibilityFields.split(',');
            requestContext.set('selectFields', fieldsArray);
        }
        next();
    });
};

export const getSelectFieldsFromContext = (entityAlias: string): string[] => {
    const selectFields: string[] = requestContext.get('selectFields') as string[];

    if (!selectFields || selectFields.length === 0) {
        return [entityAlias];
    }

    return selectFields.map((field) => `${entityAlias}.${field}`);
};
