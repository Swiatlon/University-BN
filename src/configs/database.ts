import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import dotenv from 'dotenv';
import { seedersClasses } from 'seeds';
dotenv.config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
    type: 'mysql',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: false,
    logging: true,
    logger: 'advanced-console',
    entities: [`${__dirname}/../entities/*.ts`],
    migrations: [`${__dirname}/../migrations/*.ts`],
    seeds: seedersClasses,
    factories: [`${__dirname}/../factories/*.ts`],
};

export const AppDataSource = new DataSource(options);
