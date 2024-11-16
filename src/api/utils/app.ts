export type AppConfigType = {
    env: string;
    name: string;
    url: string;
    port: string;
    loggingFile?: string;
}
export type DatabaseConfigType = {
    host: string;
    database: string;
    username: string;
    password: string;
    dialect: string;
}