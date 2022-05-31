import 'reflect-metadata';
import { container } from 'tsyringe';
import { config } from 'dotenv';
import { ModuleService } from '@southside-shared/util/module.service';
import { ServerSystemModule } from './modules/server-system.module';


config();

container.resolve(ServerSystemModule);
container.resolve(ModuleService);


