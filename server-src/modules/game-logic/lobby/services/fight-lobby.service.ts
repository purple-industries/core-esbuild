import { Singleton } from '@southside-shared/util/di.decorator';
import { Player } from 'alt-server';
import { FightingLobby, LobbyMember } from '@southside-server/modules/game-logic/models/lobby';
import { RacingMaps } from '@southside-server/modules/game-logic/gamemodes/maps/racing-maps';
import { FightLobbyPool } from '@southside-server/modules/game-logic/pools/lobby.pool';
import { FightingMaps } from '@southside-server/modules/game-logic/gamemodes/maps/fight-map';
import { FightMap } from '@southside-server/modules/game-logic/models/maps';
import { GameModeType } from '@southside-shared/enums/LobbyType.enums';
import { OneVsOneService } from '@southside-server/modules/game-logic/gamemodes/services/one-vs-one.service';

@Singleton
export class FightLobbyService {
  private fightLobbyPool: FightLobbyPool = new FightLobbyPool();
  private currentLobbyId: number = 0;
  private readonly MAX_LOBBY_MEMBER: number = 8;

  constructor(private readonly onevsoneService: OneVsOneService) {}

  public queuePlayerUp(player: Player, requestedGamemode: GameModeType) {
    let lobby: FightingLobby = null;
    if (this.fightLobbyPool.entriesAsArray().length > 0) {
      lobby = this.fightLobbyPool.entriesAsArray().find((lobby: FightingLobby) => lobby.players.length < this.MAX_LOBBY_MEMBER && lobby.gameMode === requestedGamemode);
      if (!lobby.isRunning)
        this.tryAddPlayerToLobby(player, lobby);
    } else {
      lobby = this.createLobby(requestedGamemode);
      if (!this.tryAddPlayerToLobby(player, lobby)) this.queuePlayerUp(player, requestedGamemode);
    }
    this.tryStartLobby(lobby);
  }

  private tryStartLobby(lobby: FightingLobby) {
    if (!(lobby.players.length > 1)) return;
    switch (lobby.gameMode) {
      case GameModeType.CrewWars:
        this.initializeCrewWars(lobby);
        break;
      case GameModeType.Freeroam:
        this.initializeFreemode(lobby);
        break;
      case GameModeType.OneVsOne:
        this.initializeOneVsOne(lobby);
        break;
      case GameModeType.TDM:
        this.initializeTDM(lobby);
        break;
      case GameModeType.DM:
        this.initializeDM(lobby);
        break;
    }
  }

  private tryAddPlayerToLobby(player: Player, lobby: FightingLobby): boolean {
    if (lobby.players.length >= this.MAX_LOBBY_MEMBER) return false;
    let lobbyMember = new LobbyMember(player);
    lobby.players.push(lobbyMember);
    lobby.standings.players.push(lobbyMember);
    lobby.standings.deaths.push(0);
    lobby.standings.kills.push(0);
    player.sendNotification('Warteschlange', 'Du befindest dich in der Warteschlange.');
    return true;
  }

  private createLobby(requestedGamemode: GameModeType): FightingLobby {
    let lobby = new FightingLobby();
    lobby.isPublic = true;
    lobby.gameMode = requestedGamemode;
    lobby.id = this.currentLobbyId++;
    lobby.map = this.getRandomMap();
    return lobby;
  }

  private getRandomMap(): FightMap {
    const randomIndex = Math.floor(Math.random() * RacingMaps.length);
    return FightingMaps[randomIndex];
  }

  private initializeCrewWars(lobby: FightingLobby) {

  }

  private initializeDM(lobby: FightingLobby) {

  }

  private initializeTDM(lobby: FightingLobby) {

  }

  private initializeOneVsOne(lobby: FightingLobby) {
    this.onevsoneService.initializeGamemode(lobby);
  }

  private initializeFreemode(lobby: FightingLobby) {

  }

}

