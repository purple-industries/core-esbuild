import { StatName } from '@southside-client/util/altv.enums';
import { OnServer } from '@southside-client/util/decorator/EventDecorator';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import { Module } from '@southside-shared/util/module.decorator';
import alt from 'alt-client';
import { log } from 'alt-shared';
import { WatermarkPosition } from './../../util/altv.enums';
import { AuthComponent } from './auth/auth.component';
import { StatsComponent } from '@southside-client/modules/player/stats/stats.component';

@Module({
  components: [AuthComponent, StatsComponent]
})
export class PlayerModule {
  @OnServer(ScriptEvents.Client.ConnectionComplete)
  public OnConnectionComplete() {
    log('Player connected');
    alt.setStat(StatName.Stamina, 100);
    alt.setWatermarkPosition(WatermarkPosition.BottomRight);
  }
}
