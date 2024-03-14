import type { CorsOptions } from 'cors';

const allowedOrigins = [process.env.FRONT_END_ADDRESS];

const corsOptions: CorsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS!'));
        }
    },
};

export default corsOptions;
