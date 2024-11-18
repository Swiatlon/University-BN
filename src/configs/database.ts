import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenv from 'dotenv';
import { SeedersClasses } from '@seeds/seeds';
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, NODE_ENV } = process.env;

const isDevelopment = NODE_ENV !== 'PRODUCTION';

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
    entities: [`${__dirname}/../entities/**/*${isDevelopment ? '.ts' : '.js'}`],
    migrations: [`${__dirname}/../migrations/**/*${isDevelopment ? '.ts' : '.js'}`],
    seeds: SeedersClasses,
    ssl: {
        rejectUnauthorized: !isDevelopment,
    },
    factories: [`${__dirname}/../factories/**/*${isDevelopment ? '.ts' : '.js'}`],
};

export const AppDataSource = new DataSource(options);
