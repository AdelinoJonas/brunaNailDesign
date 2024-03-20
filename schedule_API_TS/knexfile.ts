require('dotenv').config()
const path = require('path')

module.exports = {
    client: "mysql",
    connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT ?? "5432", 10),
        database: process.env.DB_DATABASE,
        user: process.env.DB_USERNAME,
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