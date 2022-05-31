import { Database } from './database/database';
import { PlayerModule } from './player/player.module';
import { Module } from '@southside-shared/util/module.decorator';

@Module({
  imports: [Database, PlayerModule]
})
export class ServerSystemModule {

}
