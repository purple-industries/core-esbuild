import { OnServer } from '../../util/decorator/EventDecorators';
import { Player } from 'alt-server';

export class PlayerModule {
  @OnServer('playerConnect')
  public onPlayerConnect(player: Player) {
    console.log('Player connected: ' + player.name);
  }
}
