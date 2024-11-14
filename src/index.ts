/// <reference types="./@types/express" />
import 'reflect-metadata';
import 'tsconfig-paths/register';
import { AppDataSource } from './configs/database';
import cors from 'cors';
import corsOptions from './configs/cors';
import errorHandler from './middlewares/ErrorHandler';
import express from 'express';
import { runSeeders } from 'typeorm-extension';
import studentsRoutes from 'routes/Students.Routes';
import authRoutes from 'routes/Auth.Routes';
import cookieParser from 'cookie-parser';
import loggedAccountRoutes from 'routes/LoggedAccount.Routes';
import communityRoutes from 'routes/Community.Routes';
import gradesRoutes from 'routes/Grades.Routes';
import { ONE_SECOND_IN_MILISECONDS } from 'constants/general/general.Constants';
import { searchMiddleware } from 'middlewares/requests/Search.Middleware';
import { paginationMiddleware } from 'middlewares/requests/Pagination.Middleware';
import { selectFieldsMiddleware } from 'middlewares/requests/SelectFields.Middleware';
import { cleanupRequestContextMiddleware } from 'middlewares/requests/CleanupRequestContext.Middleware';

const app = express();
const PORT = process.env.PORT ?? 3000;

// EXTERNAL MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// PRE-ROUTES MIDLEWARES
app.use(cleanupRequestContextMiddleware);
app.use(paginationMiddleware);
app.use(searchMiddleware);
app.use(selectFieldsMiddleware);

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/loggedAccount', loggedAccountRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/grades', gradesRoutes);
app.use('/api/community', communityRoutes);

// POST-ROUTES MIDLEWARES
app.use(errorHandler);

// SERVER
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
