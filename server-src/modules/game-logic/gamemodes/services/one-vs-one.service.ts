import { Singleton } from '@southside-shared/util/di.decorator';
import alt, { Player } from 'alt-server';
import { FightingLobby } from '@southside-server/modules/game-logic/models/lobby';
import { oneVsOneConfig } from '@southside-server/modules/game-logic/gamemodes/configs/one-vs-one.config';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import { shuffleArray } from '@southside-shared/util/algorithms';

@Singleton
export class OneVsOneService {

  public initializeGamemode(lobby: FightingLobby) {
    console.log(`initialize gamemode`);
    if (!this.isAbleToStart(lobby)) return;
    lobby.isRunning = true;
    let players = shuffleArray(lobby.players);

    players.forEach((player, idx) => {
      if (player.player.isDead) {
        player.player.spawn(lobby.map.spawns[idx].pos);
      } else {
        player.player.pos = lobby.map.spawns[idx].pos;
      }

      player.player.rot = lobby.map.spawns[idx].rot;
      player.player.health = 200;
      player.player.armour = 0;
      player.player.lobby = lobby;
      player.player.removeAllWeapons();


      player.player.freeze(true);
      player.player.emit(ScriptEvents.Countdown.StartCountdown, oneVsOneConfig.countdown);

      alt.setTimeout(() => {
        this.startGameMode(player);
      }, oneVsOneConfig.countdown);
    });
  }

  public startGameMode(player) {
    oneVsOneConfig.weapons.forEach(weapon => {
      player.player.giveWeapon(alt.hash(weapon.name), weapon.ammo, weapon.equipNow);
    });
    player.player.freeze(false);
  }

  public handleOnPlayerDeath(victim: Player, killer: Player, weaponHash: number) {
    alt.log(`[1v1] Player ${killer.user.username} killed ${victim.user.username} with ${weaponHash}`);
    let lobby = victim.lobby as FightingLobby;
    const victimStandingIdx = lobby.standings.players.findIndex((player, idx) => player.player.id === victim.id);
    const killerStandingIdx = lobby.standings.players.findIndex((player, idx) => player.player.id === killer.id);

    lobby.players.forEach((player) => player.player.removeAllWeapons());

    lobby.standings.deaths[victimStandingIdx]++;
    lobby.standings.kills[killerStandingIdx]++;
    console.log('Kills ' + JSON.stringify(lobby.standings.kills, null, 4));
    console.log('Tode: ' + JSON.stringify(lobby.standings.deaths, null, 4));
    if (lobby.standings.kills[killerStandingIdx] === oneVsOneConfig.winCondition) {
      this.endGamemodeForLobby(lobby, killer, victim);
    } else {
      this.respawnParticipants(lobby);
    }
  }

  private isAbleToStart(lobby: FightingLobby): boolean {
    return lobby.players.length === oneVsOneConfig.maxPlayer;
  }


  private endGamemodeForLobby(lobby: FightingLobby, winner: Player, loser: Player) {
    lobby.players.forEach((player) => {
      player.player.freeze(true);
    });

    winner.sendNotification(
        'Gewonnen!',
        `Du hast das 1v1 gegen ${loser.user.username} gewonnen! Als Belohnung erhältst du ${oneVsOneConfig.rewardWin} ActivityPoints.`
    );

    loser.sendNotification(
        'Verloren!',
        `Du hast das 1v1 gegen ${loser.user.username} verloren! Als Belohnung für die Teilnahme erhältst du ${oneVsOneConfig.rewardLose} ActivityPoints.`
    );

    alt.setTimeout(() => {
      lobby.players.forEach((player) => {
        player.player.freeze(false);
        player.player.lobby = null;
      });
    }, 5000);

  }

  private respawnParticipants(lobby: FightingLobby) {
    this.initializeGamemode(lobby);
  }

}
