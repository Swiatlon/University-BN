/// <reference types="./@types/express" />
import 'reflect-metadata';
import 'tsconfig-paths/register';
import { AppDataSource } from 'configs/database';
import cors from 'cors';
import corsOptions from 'configs/cors';
import errorHandler from 'middlewares/errorHandler';
import express from 'express';
import { runSeeders } from 'typeorm-extension';
import studentRoutes from 'routes/student.Routes';
import authRoutes from 'routes/auth.Routes';
import cookieParser from 'cookie-parser';
import userInfoRoutes from 'routes/userInfo.Routes';
import personalDataRoutes from 'routes/personalData.Routes';
import communityRoutes from 'routes/Community.Routes';
import dateFormatter from 'middlewares/responseDateTransformer';
import { ONE_SECOND_IN_MILISECONDS } from 'constants/general/general.Constants';
import { searchMiddleware } from 'middlewares/Requests/Search.Middleware';
import { paginationMiddleware } from 'middlewares/Requests/Pagination.Middleware';
import { selectFieldsMiddleware } from 'middlewares/Requests/SelectFields.Middleware';
import { cleanupRequestContextMiddleware } from 'middlewares/Requests/CleanupRequestContext.Middleware.ts';

const app = express();
const DEFAULT_PORT = 3000;
const PORT = process.env.SERVER_PORT ?? DEFAULT_PORT;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(dateFormatter);

app.use(cleanupRequestContextMiddleware);
app.use(paginationMiddleware);
app.use(searchMiddleware);
app.use(selectFieldsMiddleware);

app.use('/api', studentRoutes);
app.use('/api', userInfoRoutes);
app.use('/api', personalDataRoutes);
app.use('/auth', authRoutes);
app.use('/api/community', communityRoutes);

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
        });
    })
    .catch((error) => {
        console.log('Error when connecting to database!');
        console.log(error);
    });

export default app;
