/// <reference types="./@types/express" />
import 'reflect-metadata';
import 'tsconfig-paths/register';
import https from 'https';
import { AppDataSource } from './configs/database';
import cors from 'cors';
import corsOptions from './configs/cors';
import errorHandler from './middlewares/errorHandler';
import express from 'express';
import { runSeeders } from 'typeorm-extension';
import studentRoutes from 'routes/student.Routes';
import authRoutes from 'routes/auth.Routes';
import cookieParser from 'cookie-parser';
import userInfoRoutes from 'routes/userInfo.Routes';
import communityRoutes from 'routes/Community.Routes';
import wakeUpRoutes from 'routes/wakeUp.Routes';
import { ONE_SECOND_IN_MILISECONDS } from 'constants/general/general.Constants';
import { searchMiddleware } from 'middlewares/requests/Search.Middleware';
import { paginationMiddleware } from 'middlewares/requests/Pagination.Middleware';
import { selectFieldsMiddleware } from 'middlewares/requests/SelectFields.Middleware';
import { cleanupRequestContextMiddleware } from 'middlewares/requests/CleanupRequestContext.Middleware.ts';

const app = express();
const DEFAULT_PORT = 3000;
const PORT = process.env.PORT ?? DEFAULT_PORT;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(cleanupRequestContextMiddleware);
app.use(paginationMiddleware);
app.use(searchMiddleware);
app.use(selectFieldsMiddleware);

app.use('/api', studentRoutes);
app.use('/api', userInfoRoutes);
app.use('/auth', authRoutes);
app.use('/api/community', communityRoutes);
app.use('/api', wakeUpRoutes);

app.use(errorHandler);

AppDataSource.initialize()
    .then(async () => {
        console.log('Succesfully connected to DB!');
        if (process.env.NODE_ENV === 'DEVELOPMENT') {
            const overallStartTime = Date.now();
            await runSeeders(AppDataSource);
            const overallEndTime = Date.now();
            const overallDuration = (overallEndTime - overallStartTime) / ONE_SECOND_IN_MILISECONDS;
            console.log(`Finished running all seeders in ${overallDuration} seconds`);
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);

            //TODO: REFACTOR
            if (process.env.NODE_ENV !== 'DEVELOPMENT') {
                const PING_INTERVAL = 15 * 60 * 1000;
                setInterval(() => {
                    https
                        .get(`https://university-bn.onrender.com/api/wakeup`, (res) => {
                            console.log(`Pinged server to keep it awake - Status Code: ${res.statusCode}`);
                        })
                        .on('error', (err) => {
                            console.error('Ping request failed:', err);
                        });
                }, PING_INTERVAL);
            }
        });
    })
    .catch((error) => {
        console.log('Error when connecting to database!');
        console.log(error);
    });

export default app;
