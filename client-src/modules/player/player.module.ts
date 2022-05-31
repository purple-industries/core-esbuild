import { On, OnServer } from '../../util/decorator/EventDecorator';
import { log } from 'alt-shared';
import { Entity, Player } from 'alt-client';

export class PlayerModule {

  @OnServer('connectionComplete')
  public OnConnectionComplete() {
    log('Player connected');
  }


  @On('gameEntityCreate')
  public onGameEntityCreated(entity: Entity) {
    const isCar = entity instanceof Player;
    log('Entity: ' + isCar);
  }
}
