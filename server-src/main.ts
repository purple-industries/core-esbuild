import "reflect-metadata";
import * as alt from 'alt-server'
import * as dotenv from "dotenv"
import {Test} from "./test";
import {config} from "dotenv";
import {log} from "alt-server";
import {Database} from "./Database";
import {User} from "./User";
config()

Database;

alt.on('playerConnect', async (player) => {
  alt.log('~gl~[playerConnect]~w~', 'player:~cl~', player.name)
  alt.log('player streamSyncedMeta:', player.getStreamSyncedMeta('test'))

  const user = new User();
  user.username = player.name;

  await user.save()


  player.pos = new alt.Vector3(0, 0, 73)
  player.model = 'mp_m_freemode_01'
  // any player's meta will be internally cleared on restart of this resource
  // in order to emulate a player's reconnect
  player.setStreamSyncedMeta('test', 123)
  player.emit('connectionComplete')
  alt.setTimeout(() => {
    // this vehicle will be automatically destroyed on restart of this resource
    const veh = new alt.Vehicle('akuma', 0, 5, 71, 0, 0, 0)
    player.setIntoVehicle(veh, 1)


  }, 1000)
})
