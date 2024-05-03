import moment from 'moment';
import { Request, Response, NextFunction } from 'express';
import { mapValues, isObject, isArray } from 'lodash';

const isoFormat = (value: string): boolean => moment(value, moment.ISO_8601, true).isValid();

function formatDate(value: string | Date) {
    if (moment.isDate(value) || isoFormat(value)) {
        return moment(value).format('YYYY-MM-DD');
    }

    return value;
}

function transformValues(value: unknown): unknown {
    if (isArray(value)) {
        return value.map(transformValues);
    }

    if (isObject(value)) {
        return mapValues(value, transformValues);
    }

    return formatDate(value as string | Date);
}

const dateFormatter = (req: Request, res: Response, next: NextFunction): void => {
    const originalSend = res.send;

    res.send = (data: string): Response => {
        const parsedData: unknown = JSON.parse(data);
        const transformedData: unknown = transformValues(parsedData);
        return originalSend.call(res, JSON.stringify(transformedData));
    };

    next();
};

export default dateFormatter;
