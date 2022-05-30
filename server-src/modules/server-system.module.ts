import { Module } from '../../shared-src/util/ModuleDecorator';
import { Database } from './database/database';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [Database, PlayerModule]
})
export class ServerSystemModule {

}
