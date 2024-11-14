export const HTTP_STATUS = {
    OK: { code: 200, message: 'OK' },
    CREATED: { code: 201, message: 'Created' },
    NO_CONTENT: { code: 204, message: 'No Content' },
    BAD_REQUEST: { code: 400, message: 'Bad Request' },
    UNAUTHORIZED: { code: 401, message: 'Access Denied' },
    FORBIDDEN: { code: 403, message: 'Forbidden' },
    NOT_FOUND: { code: 404, message: 'Not Found' },
    INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
};

export const TIME = {
    days: 1,
    hours: 24,
    minutes: 60,
    seconds: 60,
    miliSeconds: 1000,
};

export const ONE_MINUTE = TIME.minutes * TIME.seconds * TIME.miliSeconds;
export const ONE_HOUR = TIME.hours * TIME.minutes * TIME.seconds * TIME.miliSeconds;
export const ONE_DAY = TIME.days * TIME.hours * TIME.minutes * TIME.seconds * TIME.miliSeconds;

export const SHORT_ACCESS_TOKEN_TIME = '15m';
export const LONGER_ACCESS_TOKEN_TIME = '30m';

export const SHORT_REFRESH_TOKEN_TIME = '16m';
export const LONGER_REFRESH_TOKEN_TIME = '7d';

export const ONE_SECOND_IN_MILISECONDS = 1000;
