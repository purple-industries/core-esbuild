import { Player } from 'alt-server';
import { On } from '../../util/decorator/EventDecorators';
import { injectable } from 'tsyringe';

@injectable()
export class PlayerModule {
  constructor() {}

  @On('playerConnect')
  public onPlayerConnect(player: Player) {
    player.spawn(0, 0, 72);
  }
}
