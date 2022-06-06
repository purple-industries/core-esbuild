import { Component } from '@southside-shared/util/di.decorator';
import { OnServer } from '@southside-client/util/decorator/EventDecorator';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import alt from 'alt-client';
import * as natives from 'natives';

@Component
export class PlayerControlsComponent {

  private everyTickHandle: number = null;
  private everyTickHandleTwo: number = null;

  @OnServer(ScriptEvents.Control.ToggleGameControls)
  public handleToggleGameControls(toggle: boolean) {
    natives.clearPedTasksImmediately(alt.Player.local);
    if (toggle) {
      if (this.everyTickHandleTwo) alt.clearEveryTick(this.everyTickHandleTwo);
      this.everyTickHandle = alt.everyTick(() => {
        natives.disableAllControlActions(alt.Player.local.scriptID);

      });
    } else {
      alt.clearEveryTick(this.everyTickHandle);
      this.everyTickHandleTwo = alt.everyTick(() => {
        natives.enableAllControlActions(alt.Player.local.scriptID);
      });
    }

  }
}
