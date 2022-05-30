import { On, OnServer } from '../../util/decorator/EventDecorator';
import { log } from 'alt-shared';
import alt, { Entity } from 'alt-client';

export class PlayerModule {

  @OnServer('connectionComplete')
  public OnConnectionComplete() {
    log('Player connected');
  }

  @On('gameEntityCreate')
  public onGameEntityCreated(entity: Entity) {
    const isCar = entity instanceof alt.Player;
    alt.log('Entity: ' + isCar);
  }
}
