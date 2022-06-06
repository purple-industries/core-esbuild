import { FightMap, Spawn } from '@southside-server/modules/game-logic/models/maps';
import alt from 'alt-server';

export const FightingMaps: FightMap[] = [
  {
    id: 0,
    name: 'Test',
    spawns: [
      new Spawn(
          new alt.Vector3(101.55165100097656, -1015.92529296875, 29.3978271484375),
          new alt.Vector3(0, 0, -0.3957912027835846)
      ), new Spawn(
          new alt.Vector3(116.32087707519531, -977.3934326171875, 29.3978271484375),
          new alt.Vector3(0, 0, 2.671590805053711)
      )
    ]
  }
];
