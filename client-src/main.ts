import * as alt from "alt-client"
import * as native from "natives"
import {Entity} from "alt-client";

native.setClockTime(15, 0, 0)

alt.onServer('connectionComplete', () => {
    alt.setTimeout(() => {
        alt.log('connected');
    },2000)

})

alt.on('gameEntityCreate', (entity: Entity) => {
    const isCar = entity instanceof alt.Player;
    alt.log('Entity: ' + isCar )
})
