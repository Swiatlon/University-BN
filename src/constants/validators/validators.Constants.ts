export const Validation = {
    NAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 55,
        MIN_LENGTH_MESSAGE: 'Name must be at least $constraint1 characters long.',
        MAX_LENGTH_MESSAGE: 'Name must be no longer than $constraint1 characters.',
        REQUIRED_MESSAGE: 'Name is required.',
    },
    PESEL: {
        LENGTH: 11,
        LENGTH_MESSAGE: 'PESEL must be exactly $constraint1 characters.',
        REQUIRED_MESSAGE: 'PESEL is required.',
    },
    LOGIN: {
        MIN_LENGTH: 5,
        MAX_LENGTH: 111,
        MIN_LENGTH_MESSAGE: 'Login must be at least $constraint1 characters long.',
        MAX_LENGTH_MESSAGE: 'Login must be no longer than $constraint1 characters.',
        REQUIRED_MESSAGE: 'Login is required.',
    },
    EMAIL: {
        MIN_LENGTH: 6,
        MAX_LENGTH: 320,
        MIN_LENGTH_MESSAGE: 'Email must be at least $constraint1 characters long.',
        MAX_LENGTH_MESSAGE: 'Email must be no longer than $constraint1 characters.',
        REQUIRED_MESSAGE: 'Email is required.',
    },
    PASSWORD: {
        MIN_LENGTH: 8,
        MAX_LENGTH: 72,
        MIN_LENGTH_MESSAGE: 'Password must be at least $constraint1 characters long.',
        MAX_LENGTH_MESSAGE: 'Password must be no longer than $constraint1 characters.',
        REQUIRED_MESSAGE: 'Password is required.',
    },
    COURSES_NAME: {
        MAX_LENGTH: 255,
        MAX_LENGTH_MESSAGE: 'Course name must be no longer than $constraint1 characters.',
        REQUIRED_MESSAGE: 'Course name is required.',
    },
};
