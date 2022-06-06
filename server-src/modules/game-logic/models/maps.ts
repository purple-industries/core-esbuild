import { Vector3 } from 'alt-server';

export abstract class Maps {
  id: number;
  name: string;
  spawns: Spawn[];
}

export class RacingMap extends Maps {

}

export class FightMap extends Maps {

}


export class Spawn {
  pos: Vector3;
  rot: Vector3;

  constructor(pos: Vector3, rot: Vector3) {
    this.rot = rot;
    this.pos = pos;
  }
}
