import { Module } from '@southside-shared/util/module.decorator';
import { PlayerDeathComponent } from '@southside-server/modules/player/events/components/player-death.component';
import {
  PlayerDisconnectComponent
} from '@southside-server/modules/player/events/components/player-disconnect.component';

@Module({
  components: [PlayerDeathComponent, PlayerDisconnectComponent]
})
export class PlayerEventModule {
}
