import { Module } from '@southside-shared/util/module.decorator';
import '../extends/alt-player.prototype';
import { Database } from './database/database.module';
import { PlayerModule } from './player/player.module';
import { PlayerEventModule } from '@southside-server/modules/player/events/player-event.module';
import { GameLogicModule } from '@southside-server/modules/game-logic/game-logic.module';

@Module({
  imports: [Database, PlayerModule, PlayerEventModule, GameLogicModule]
})

export class ServerSystemModule {}
