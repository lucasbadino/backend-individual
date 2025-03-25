import { DataSource, DataSourceOptions } from "typeorm";
import { config as dotenvConfig } from 'dotenv'
import { registerAs } from "@nestjs/config";

dotenvConfig({ path: '.env.development' })
const dbConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    autoLoadEntities: true,
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
};


export const postgresConfig = registerAs('typeorm', () => dbConfig)
export const conectDataSource = new DataSource(dbConfig as DataSourceOptions)