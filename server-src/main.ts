import 'reflect-metadata';
import * as alt from 'alt-server';
import { config } from 'dotenv';
import { User } from './modules/database/entities/User';
import { container } from 'tsyringe';
import { ModuleService } from './util/services/module.service';
import { SystemModule } from './modules/system.module';

config();

container.resolve(SystemModule);
container.resolve(ModuleService);

alt.on('playerConnect', async (player) => {
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
    const veh = new alt.Vehicle('akuma', 0, 5, 71, 0, 0, 0);
    player.setIntoVehicle(veh, 1);

    const user = new User();
    user.username = player.name;

    await user.save();
  }, 1000);
});
