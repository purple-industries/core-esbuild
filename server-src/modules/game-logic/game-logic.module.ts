import { Module } from '@southside-shared/util/module.decorator';
import { OnClient } from '@southside-server/util/decorator/EventDecorators';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import { Player } from 'alt-server';
import { GameModeType } from '@southside-shared/enums/LobbyType.enums';
import { FightLobbyService } from '@southside-server/modules/game-logic/lobby/services/fight-lobby.service';
import { GamemodesComponent } from '@southside-server/modules/game-logic/gamemodes/gamemodes.component';

@Module({
  components: [GamemodesComponent]
})
export class GameLogicModule {
  constructor(
      private readonly fightLobbyService: FightLobbyService
  ) {}

  @OnClient(ScriptEvents.Queue.Register)
  public handleQueueRegister(player: Player, requestedGamemode: GameModeType) {
    console.log(`triggered`);
    this.fightLobbyService.queuePlayerUp(player, requestedGamemode);

  }
}
