import { createNamespace, Namespace } from 'cls-hooked';
import { Response, NextFunction } from 'express';
import { ICustomVisbilityFieldRequest } from 'interfaces/Global/IGlobal';

export const requestContext: Namespace = createNamespace('request-context');

export const visibilityFieldsFilter = (req: ICustomVisbilityFieldRequest, res: Response, next: NextFunction): void => {
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
