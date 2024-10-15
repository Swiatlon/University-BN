import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenv from 'dotenv';
import { SeedersClasses } from '@seeds/seeds';
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: false,
    logging: false,
    logger: 'advanced-console',
    entities: [`${__dirname}/../entities/**/*.ts`],
    migrations: [`${__dirname}/../migrations/*.ts`],
    seeds: SeedersClasses,
    ssl: {
        rejectUnauthorized: true,
    },
    factories: [`${__dirname}/../factories/**/*.ts`],
};

export const AppDataSource = new DataSource(options);
