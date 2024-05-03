import rateLimit from 'express-rate-limit';

const repeatOfSeconds = 60;
const oneSecond = 1000;

export const loginLimiter = rateLimit({
    windowMs: repeatOfSeconds * oneSecond,
    max: 5, // Max 5 attempts per 'window' per 60 seconds
    message: { message: 'Too many login attempts from this IP, please try again after a 60 second pause' },
    handler: (req, res, next, options) => {
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
});
