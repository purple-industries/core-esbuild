import alt, { Player } from 'alt-server';
import { On } from '../../util/decorator/EventDecorators';


export class PlayerModule {
  @On('playerConnect')
  public onPlayerConnect(player: Player) {
    alt.log('~gl~[playerConnect]~w~', 'player:~cl~', player.name);
    alt.log('player streamSyncedMeta:', player.getStreamSyncedMeta('test'));

    player.pos = new alt.Vector3(0, 0, 73);
    player.model = 'mp_m_freemode_01';
    // any player's meta will be internally cleared on restart of this resource
    // in order to emulate a player's reconnect
    player.setStreamSyncedMeta('test', 123);
    player.emit('connectionComplete');
    alt.setTimeout(async () => {
      // this vehicle will be automatically destroyed on restart of this resource

      /*const user = new User();
      user.username = player.name;
      await user.save();*/
    }, 1000);
    let veh = new alt.Vehicle('ignus', 0, 5, 71, 0, 0, 0);
    alt.setTimeout(() => {
      player.setIntoVehicle(veh, 1);
    }, 2000);

  }
}
