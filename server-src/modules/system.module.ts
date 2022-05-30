import { Module } from '../util/decorator/ModuleDecorator';
import { Database } from './database/database';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [Database, PlayerModule]
})
export class SystemModule {

}
