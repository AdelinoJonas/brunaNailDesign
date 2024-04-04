import {Knex} from 'knex';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config: Knex.Config = {
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? "5432", 10),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
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