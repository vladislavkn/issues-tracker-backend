import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DATABASE_CONFIG_KEY = 'database';

export const databaseConfig = registerAs<TypeOrmModuleOptions>(
  DATABASE_CONFIG_KEY,
  () => ({
    // @ts-ignore
    type: process.env.DB_TYPE,
    port: parseInt(process.env.DB_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.DB_HOST,
    synchronize: Boolean(process.env.DB_SYNC),
  }),
);
