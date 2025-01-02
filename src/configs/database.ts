import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenv from 'dotenv';
import { SeedersClasses } from '@seeds/seeds';
dotenv.config();

const { DB_HOST, DB_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, NODE_ENV, USE_SSL } = process.env;

const isDevelopment = NODE_ENV !== 'PRODUCTION';

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    synchronize: false,
    logging: false,
    logger: 'advanced-console',
    entities: [`${__dirname}/../entities/**/*${isDevelopment ? '.ts' : '.js'}`],
    migrations: [`${__dirname}/../migrations/**/*${isDevelopment ? '.ts' : '.js'}`],
    seeds: SeedersClasses,
    factories: [`${__dirname}/../factories/**/*${isDevelopment ? '.ts' : '.js'}`],
    ssl: USE_SSL === 'true' ? { rejectUnauthorized: true } : false,
};

export const AppDataSource = new DataSource(options);
