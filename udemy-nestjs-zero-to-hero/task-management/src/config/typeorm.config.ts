import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from 'config';

const dbConfig: any = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mssql',
    host: process.env.DB_HOST || dbConfig.host,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB || dbConfig.database,
    entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    synchronize: true,
};
