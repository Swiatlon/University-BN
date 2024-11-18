import { NextFunction, Request, Response } from 'express';
import { ValidationError, validate } from 'class-validator';
import { HTTP_STATUS } from 'constants/general/general.Constants';
import { plainToInstance } from 'class-transformer';

const NO_ERRORS = 0;

export function validateDto<T extends object>(dtoClass: new () => T) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data = plainToInstance(dtoClass, req.body);
        const errors = await validate(data as object, { validationError: { target: false } });

        if (errors.length > NO_ERRORS) {
            const detailedErrors = errors.map((error: ValidationError) => {
                return {
                    property: error.property,
                    messages: error.constraints ? Object.values(error.constraints) : [],
                };
            });

            res.status(HTTP_STATUS.BAD_REQUEST.code).json({ errors: detailedErrors });

            return;
        }

        next();
    };
}
