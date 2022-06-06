import { Module } from '@southside-shared/util/module.decorator';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { UserStats } from '@southside-server/modules/database/entities/UserStats';

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
      host: 'localhost',
      port: 3306,
      username: 'southside',
      password: 'test123',
      database: 'southside',
      entities: [User, UserStats],
      synchronize: true,
      logging: false
    })
        .initialize()
        .then((database) => {
          console.log('DB connection established');
          this.database = database;

        });
  }
}
