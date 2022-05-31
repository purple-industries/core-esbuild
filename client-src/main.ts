import 'reflect-metadata';
import * as native from 'natives';
import { container } from 'tsyringe';
import { ClientSystemModule } from './modules/client-system.module';

container.resolve(ClientSystemModule);
native.setClockTime(15, 0, 0);

