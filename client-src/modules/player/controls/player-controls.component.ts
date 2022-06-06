import { Component } from '@southside-shared/util/di.decorator';
import { OnServer } from '@southside-client/util/decorator/EventDecorator';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import alt from 'alt-client';

@Component
export class PlayerControlsComponent {

  private everyTickHandle: number = null;
  private everyTickHandleTwo: number = null;

  @OnServer(ScriptEvents.Control.ToggleGameControls)
  public handleToggleGameControls(toggle: boolean) {
    if (toggle) {
      if (this.everyTickHandleTwo) alt.clearEveryTick(this.everyTickHandleTwo);
      this.everyTickHandle = alt.everyTick(() => {
        alt.toggleGameControls(!toggle);
      });
    } else {
      alt.clearEveryTick(this.everyTickHandle);
      this.everyTickHandleTwo = alt.everyTick(() => {
        alt.toggleGameControls(!toggle);
      });
    }

  }
}
