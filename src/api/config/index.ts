import dotenv from "dotenv";

dotenv.config();    // .env dosyasındaki değerlere process.env ile ulaşmayı sağlar.

type AppConfigType = {
    env: string;
    name: string;
    url: string;
    port: string;
}
type DatabaseConfigType = {
    host: string;
    database: string;
    username: string;
    password: string;
    dialect: string;
}

export const appConfig: AppConfigType = {
    env: process.env.NODE_ENV as string,
    name: process.env.APP_NAME as string,
    url: process.env.APP_URL as string,
    port: process.env.APP_PORT as string
};
export const databaseConfig: DatabaseConfigType = {
    host: process.env.DB_HOST as string,
    database: process.env.DB_DATABASE as string,
    username: process.env.DB_USERNAME as string,
    password: process.env.DB_PASSWORD as string,
    dialect: process.env.DB_CONNECTION as string
};