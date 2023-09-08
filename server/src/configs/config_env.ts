import dotenv, { DotenvParseOutput } from 'dotenv';
import path from 'path';

interface ENV_VAL extends DotenvParseOutput {
    APP_NAME: string
    HOSTNAME: string
    PORT: string
    CORS_ORIGIN: string
    DB_PORT: string
    DB_HOST: string
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
    JWT_KEY: string
    JWT_REFRESH_KEY: string
    JWT_RESET_KEY: string
    MAIL_SERVICE: string
    MAIL_USER: string
    MAIL_PASSWORD: string,
    FB_APP_ID: string
    FB_SECRET_TOKEN: string
}

export default dotenv.config(
    process.env.NODE_ENV === "dev"
        ? { path: path.resolve(process.cwd(), '.env.dev') }
        : undefined
).parsed as ENV_VAL;