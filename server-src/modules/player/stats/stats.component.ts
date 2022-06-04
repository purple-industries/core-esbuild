import { Component } from '@southside-shared/util/di.decorator';
import { OnClient } from '@southside-server/util/decorator/EventDecorators';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import { Player } from 'alt-server';

@Component
export class StatsComponent {

  @OnClient(ScriptEvents.Stats.RequestStats)
  public handleRequestStats(player: Player) {
    player.emit(ScriptEvents.Stats.ReceiveStats, { name: player.user.username, kills: 0, deaths: 0, level: 0, xp: 0 });
  }
}
