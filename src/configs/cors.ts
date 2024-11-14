import { HTTP_STATUS } from 'constants/general/general.Constants';
import type { CorsOptions } from 'cors';

const allowedOrigins = [process.env.FRONT_END_ADDRESS];

const corsOptions: CorsOptions = {
    credentials: true,
    optionsSuccessStatus: HTTP_STATUS.OK.code,

    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS!'));
        }
    },
};

export default corsOptions;
