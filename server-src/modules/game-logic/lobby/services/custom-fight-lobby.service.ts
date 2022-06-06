import { Singleton } from '@southside-shared/util/di.decorator';
import { CustomFightLobby, Lobby, LobbyMember } from '@southside-server/modules/game-logic/models/lobby';
import { Player } from 'alt-server';
import { GameModeType } from '@southside-shared/enums/LobbyType.enums';
import { FightLobbyPool } from '@southside-server/modules/game-logic/pools/lobby.pool';
import { FightingMaps } from '@southside-server/modules/game-logic/gamemodes/maps/fight-map';


@Singleton
export class CustomFightLobbyService {
  private readonly customFightLobbyPool: FightLobbyPool = new FightLobbyPool();
  private currentLobbyId: number = 0;
  private readonly MAX_LOBBY_MEMBER: number = 4;

  public createNewLobby(player: Player, gameMode: GameModeType, mapName: string): Lobby {
    let lobby = new CustomFightLobby();

    lobby.id = this.currentLobbyId;
    lobby.owner = new LobbyMember(player);
    lobby.players.push(lobby.owner);
    lobby.gameMode = gameMode;
    lobby.token = this.generateLobbyToken();
    lobby.map = FightingMaps.find((map) => map.name === mapName);

    this.currentLobbyId++;
    this.customFightLobbyPool.upsert(lobby.id, lobby);

    return lobby;
  }

  public tryAddPlayerToLobby(player: Player, lobby: Lobby): boolean {
    if (lobby.players.length > this.MAX_LOBBY_MEMBER) return false;
    let newLobbyPlayer = new LobbyMember(player);
    lobby.players.push(newLobbyPlayer);
    return true;
  }

  public removePlayerFromLobby(player: Player, lobby: Lobby): void {
    let index = lobby.players.findIndex((lobbyMember) => lobbyMember.player == player);
    if (index === -1) return;
    lobby.players.splice(index, 1);
  }

  public startLobby(lobby: CustomFightLobby) {
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

  private generateLobbyToken(): string {
    let token = Math.random().toString(36).substr(2);
    let lobbies = this.customFightLobbyPool.entriesAsArray();

    for (const lobby of lobbies) {
      if (lobby.token === token) return this.generateLobbyToken();
    }

    return token;
  }

  private initializeCrewWars(lobby: CustomFightLobby) {

  }

  private initializeFreemode(lobby: CustomFightLobby) {

  }

  private initializeOneVsOne(lobby: CustomFightLobby) {

  }

  private initializeTDM(lobby: CustomFightLobby) {

  }

  private initializeDM(lobby: CustomFightLobby) {

  }
}
