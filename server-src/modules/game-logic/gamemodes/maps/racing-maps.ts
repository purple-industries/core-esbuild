import { RacingMap, Spawn } from '@southside-server/modules/game-logic/models/maps';
import alt from 'alt-server';

export const RacingMaps: RacingMap[] = [
  {
    id: 0,
    name: 'Test',
    spawns: [
      new Spawn(new alt.Vector3(0, 0, 72), new alt.Vector3(0, 0, 0))
    ]
  }
];
