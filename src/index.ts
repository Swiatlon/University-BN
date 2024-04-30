import 'reflect-metadata';
import { AppDataSource } from 'configs/database';
import cors from 'cors';
import corsOptions from 'configs/cors';
import errorHandler from 'middlewares/errorHandler';
import express from 'express';
import { runSeeders } from 'typeorm-extension';
import studentRoutes from 'routes/studentRoutes';
import authRoutes from 'routes/authRoutes';
import cookieParser from 'cookie-parser';
import userInfoRoutes from 'routes/userInfoRoutes';
import personalDataRoutes from 'routes/personalDataRoutes';
import { visibilityFieldsFilter } from 'middlewares/visibilityFieldsFilters';

const app = express();
const DEFAULT_PORT = 3000;
const PORT = process.env.SERVER_PORT ?? DEFAULT_PORT;

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use(visibilityFieldsFilter);

app.use('/api', studentRoutes);
app.use('/api', userInfoRoutes);
app.use('/api', personalDataRoutes);
app.use('/auth', authRoutes);

app.use(errorHandler);

AppDataSource.initialize()
    .then(async () => {
        console.log('Succesfully connected to DB!');
        if (process.env.NODE_ENV === 'DEVELOPMENT') {
            await runSeeders(AppDataSource);
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
