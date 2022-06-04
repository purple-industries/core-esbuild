import { Player } from 'alt-server';
import { PlayerExtend } from './player.extend';
import { PlayerInterface } from './player.interface';

declare module 'alt-server' {
  export interface Player extends PlayerInterface {}
}

Player.prototype = new PlayerExtend();
