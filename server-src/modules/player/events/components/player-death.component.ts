import { Component } from '@southside-shared/util/di.decorator';
import { On } from '@southside-server/util/decorator/EventDecorators';
import alt, { Entity, Player, Vector3 } from 'alt-server';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';


@Component
export class PlayerDeathComponent {
  @On('playerDeath')
  public handlePlayerDeath(victim: Player, killer: Entity, weaponHash: number) {
    this.handleVictim(victim);
    if (killer instanceof Player) {
      this.handleKiller(killer, victim, weaponHash);

    } else {
      alt.log(`Player ${victim.user.username} died. (Killed with weaponHash: ${weaponHash})`);
    }
  }

  private handleVictim(victim: Player) {
    victim.emit(ScriptEvents.Stats.IncrementDeaths);
    victim.spawn(162.01318359375, -1007.103271484375, 29.4483642578125, 5);
    victim.rot = new Vector3(0, 0, 2.7211);
    victim.user.stats.deaths++;
    victim.killStreak = 0;
  }

  private handleKiller(killer: Player, victim: Player, weaponHash: number) {
    alt.log(`Player ${killer.user.username} killed Player ${victim.user.username}. (Killed with weaponHash: ${weaponHash})`);
    killer.emit(ScriptEvents.Stats.IncrementKills);
    killer.user.stats.kills++;

    killer.killStreak++;
    if (killer.killStreak > killer.user.stats.maxKillstreak) {
      killer.user.stats.maxKillstreak = killer.killStreak;
      alt.log(`Player ${killer.user.username} is on a ${killer.killStreak} killstreak!`);
    }
  }
}
