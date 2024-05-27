import {Knex} from 'knex';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
    client: "mysql",
    connection: {
        host: process.env.DB_HOST ?? '0.0.0.0',
        port: parseInt(process.env.DB_PORT ?? "3318", 10),
        database: process.env.DB_DATABASE ?? 'appbrunanail_db',
        user: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? '123456',
    },
    migrations: {
        directory: "src/migrations",
        extension: "ts",
    },
    seeds:{
        directory:path.resolve(__dirname, 'src', 'seeds')
    }
};

export default config;