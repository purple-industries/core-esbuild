import { Component } from '@southside-shared/util/di.decorator';
import { On } from '@southside-server/util/decorator/EventDecorators';
import { Entity, Player, Vector3 } from 'alt-server';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';

@Component
export class PlayerDeathComponent {
  @On('playerDeath')
  public handlePlayerDeath(victim: Player, killer: Entity, weaponHash: number) {
    victim.emit(ScriptEvents.Stats.IncrementDeaths);
    victim.spawn(162.01318359375, -1007.103271484375, 29.4483642578125, 5);
    victim.rot = new Vector3(0, 0, 2.7211);

    if (killer instanceof Player) {
      killer.emit(ScriptEvents.Stats.IncrementKills);
    }
  }
}
