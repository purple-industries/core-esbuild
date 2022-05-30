import { Database } from './database/database';
import { PlayerModule } from './player/player.module';
import { Module } from '@southside-shared/util/ModuleDecorator';

@Module({
  imports: [Database, PlayerModule]
})
export class ServerSystemModule {

}
