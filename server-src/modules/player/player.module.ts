import { Player } from 'alt-server';
import { On } from '../../util/decorator/EventDecorators';
import { TestService } from './service';
import { injectable } from 'tsyringe';

@injectable()
export class PlayerModule {
  constructor(private readonly service: TestService) {}

  @On('playerConnect')
  public onPlayerConnect(player: Player) {
    this.service.log();
  }
}
