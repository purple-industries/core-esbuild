import 'reflect-metadata';
import { config } from 'dotenv';
import { container } from 'tsyringe';
import { ModuleService } from '../shared-src/util/module.service';
import { ServerSystemModule } from './modules/server-system.module';

config();

container.resolve(ServerSystemModule);
container.resolve(ModuleService);
