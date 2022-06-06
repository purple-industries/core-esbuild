import { Module } from '@southside-shared/util/module.decorator';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { UserStats } from '@southside-server/modules/database/entities/UserStats';
//@ts-ignore
import * as env from 'env';

@Module({})
export class Database {
  private database: void | DataSource;

  constructor() {
    this.initialize();
  }

  /**
   *
   * DB_HOST=localhost
   * DB_PORT=3306
   * DB_USERNAME=southside
   * DB_PASSWORD=test123
   * DB_NAME=southside
   * DEV=false
   * @private
   */
  private initialize() {
    new DataSource({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, UserStats],
      synchronize: true,
      logging: !!process.env.DEV
    })
        .initialize()
        .then((database) => {
          console.log('DB connection established');
          this.database = database;

        });
  }
}
