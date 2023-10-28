import mysql from 'mysql2';
import config from "./env";

const connection = mysql.createPool({
    port: Number(config.DB_PORT),
    host: config.DB_HOST,
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME
})

export default connection.promise();