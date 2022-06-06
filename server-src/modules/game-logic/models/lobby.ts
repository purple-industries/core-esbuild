import { Player } from 'alt-server';
import { GameModeType } from '@southside-shared/enums/LobbyType.enums';
import { FightMap, RacingMap } from '@southside-server/modules/game-logic/models/maps';


export abstract class Lobby {
  id: number;
  players: LobbyMember[] = [];
  gameMode: GameModeType;
  isPublic: boolean;
  isRunning: boolean = false;
  token: string;
}

export class RacingLobby extends Lobby {
  map: RacingMap;

  constructor() {
    super();
    this.isPublic = true;
  }
}


export class FightingLobby extends Lobby {
  map: FightMap;
  standings: FightingLeaderboard = new FightingLeaderboard();
}

export class CustomFightLobby extends FightingLobby {
  owner: LobbyMember;
}


export class LobbyMember {
  player: Player;
  isReady: boolean = false;

  constructor(player: Player) {
    this.player = player;
  }
}

export class FightingLeaderboard {
  players: LobbyMember[] = [];
  kills: number[] = [];
  deaths: number[] = [];
}

