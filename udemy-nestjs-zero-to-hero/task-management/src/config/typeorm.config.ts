import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mssql',
    host: 'localhost\\sql2019',
    port: 1433,
    username: `nestjs`,
    password: `nestjs`,
    database: `nestjs-hero`,
    entities: [`${__dirname}/../**/*.entity.{ts,js}`],
    synchronize: true,
};
