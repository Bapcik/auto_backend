import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { env } from '../env';
import { User } from '../entities/user.entity';
import UserSeeder from '../db/seeds/user.seed';
import { UserFactory } from '../db/factories/user.factory';
import { Auto } from '../entities/auto.entity';
import AutoSeeder from '../db/seeds/auto.seed';
import { AutoFactory } from '../db/factories/auto.factory';

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: env.host || 'mysql',
  port: 3306,
  database: 'auto',
  username: env.dbUser,
  password: env.dbPassword,
  synchronize: true,
  logging: true,
  entities: [User, Auto],
  seeds: [UserSeeder, AutoSeeder],
  factories: [UserFactory, AutoFactory],
};

export const appDataSource = new DataSource(options);
