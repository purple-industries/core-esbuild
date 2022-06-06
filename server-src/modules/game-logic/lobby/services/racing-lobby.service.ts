import { Singleton } from '@southside-shared/util/di.decorator';
import { RacingLobbyPool } from '@southside-server/modules/game-logic/pools/racing-lobby.pool';
import { Player } from 'alt-server';
import { LobbyMember, RacingLobby } from '@southside-server/modules/game-logic/models/lobby';
import { RacingMap } from '@southside-server/modules/game-logic/models/maps';
import { RacingMaps } from '@southside-server/modules/game-logic/gamemodes/maps/racing-maps';

@Singleton
export class RacingLobbyService {
  private racingLobbyPool: RacingLobbyPool = new RacingLobbyPool();
  private currentLobbyId: number = 0;
  private readonly MAX_LOBBY_MEMBER: number = 8;

  public queuePlayerUp(player: Player) {
    if (this.racingLobbyPool.entriesAsArray().length > 0) {
      const lobby = this.racingLobbyPool.entriesAsArray().find((lobby) => lobby.players.length < this.MAX_LOBBY_MEMBER);
      this.tryAddPlayerToLobby(player, lobby);
    } else {
      const lobby = this.createRacingLobby();
      if (!this.tryAddPlayerToLobby(player, lobby)) this.queuePlayerUp(player);
    }
  }

  private tryAddPlayerToLobby(player: Player, lobby: RacingLobby): boolean {
    if (lobby.players.length >= this.MAX_LOBBY_MEMBER) return false;
    lobby.players.push(new LobbyMember(player));
    return true;
  }

  private createRacingLobby(): RacingLobby {
    let lobby = new RacingLobby();
    lobby.id = this.currentLobbyId++;
    lobby.map = this.getRandomRacingMap();
    return lobby;
  }

  private getRandomRacingMap(): RacingMap {
    const randomIndex = Math.floor(Math.random() * RacingMaps.length);
    return RacingMaps[randomIndex];
  }
}

