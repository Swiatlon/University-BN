export const HTTP_STATUS = {
    OK: { code: 200, message: 'OK' },
    CREATED: { code: 201, message: 'Created' },
    NO_CONTENT: { code: 204, message: 'No Content' },
    BAD_REQUEST: { code: 400, message: 'Bad Request' },
    UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
    FORBIDDEN: { code: 403, message: 'Forbidden' },
    NOT_FOUND: { code: 404, message: 'Not Found' },
    INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
};

export const ACCESS_TOKEN_TIME = '15m';

export const ONE_SECOND_IN_MILISECONDS = 1000;
