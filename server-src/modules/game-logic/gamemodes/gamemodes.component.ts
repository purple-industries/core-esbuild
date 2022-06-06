import { Component } from '@southside-shared/util/di.decorator';
import { On } from '@southside-server/util/decorator/EventDecorators';
import { Entity, Player } from 'alt-server';
import { GameModeType } from '@southside-shared/enums/LobbyType.enums';
import { OneVsOneService } from '@southside-server/modules/game-logic/gamemodes/services/one-vs-one.service';

@Component
export class GamemodesComponent {
  constructor(private readonly oneVsOneService: OneVsOneService) {}

  @On('playerDeath')
  public handlePlayerDeath(victim: Player, killer: Entity, weaponHash: number) {
    if (!(killer instanceof Player)) return;
    if (!(victim.lobby.id === killer.lobby.id) && !(victim.lobby.gameMode === killer.lobby.gameMode)) return;

    switch (victim.lobby.gameMode) {
      case GameModeType.OneVsOne:
        this.oneVsOneService.handleOnPlayerDeath(victim, killer, weaponHash);
        break;
    }

  }
}
