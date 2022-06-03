import { Module } from '@southside-shared/util/module.decorator';
import { PlayerDeathComponent } from '@southside-server/modules/player/events/components/player-death.component';

@Module({
  components: [PlayerDeathComponent]
})
export class PlayerEventModule {
}
