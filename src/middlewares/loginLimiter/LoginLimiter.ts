import { ONE_SECOND_IN_MILISECONDS } from 'constants/general/general.Constants';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

const REPEAT_OF_SECONDS = 60;

interface IRateLimitOptions {
    statusCode: number;
    message: string;
}

export const loginLimiter: RateLimitRequestHandler = rateLimit({
    windowMs: REPEAT_OF_SECONDS * ONE_SECOND_IN_MILISECONDS,
    max: 5,
    message: 'Too many login attempts from this IP, please try again after a 60 second pause.',
    handler: (req, res, next, options: IRateLimitOptions) => {
        res.status(options.statusCode).json({ message: options.message });
    },
    standardHeaders: true,
    legacyHeaders: false,
});
