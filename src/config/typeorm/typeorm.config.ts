import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  autoLoadEntities: true,
  synchronize: false,
  migrations: ['./dist/migrations/*.js'],
  cli: {
    migrationsDir: './migrations/'
  },
  entities: [join(__dirname, '../../modules/**/entities/*.entity.js')]
};

export = typeormConfig;
