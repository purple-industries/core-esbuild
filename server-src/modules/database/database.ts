import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { registeredEntities } from './decorator';
import { Module } from '../../util/decorator/ModuleDecorator';

@Module({})
export class Database {
  private database: void | DataSource;

  constructor() {
    this.initialize();
  }

  private initialize() {
    new DataSource({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        ...registeredEntities
      ],
      synchronize: true,
      logging: true
    }).initialize().then(database => {
      console.log('DB connection established');
      this.database = database;
    });
  }
}


