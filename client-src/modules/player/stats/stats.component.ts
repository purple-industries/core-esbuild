import { Component } from '@southside-shared/util/di.decorator';
import { OnServer, OnWebview } from '@southside-client/util/decorator/EventDecorator';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import { GuiService } from '@southside-client/modules/gui/gui.service';
import { emitServer } from 'alt-client';

@Component
export class StatsComponent {
  constructor(
      private readonly guiService: GuiService
  ) {}

  @OnServer(ScriptEvents.Stats.IncrementDeaths)
  public handleIncrementDeaths() {
    console.log('increment deaths clientside');

    this.guiService.emit(ScriptEvents.Stats.IncrementDeaths);
  }

  @OnWebview(ScriptEvents.Stats.RequestStats)
  public handleRequestStats() {
    emitServer(ScriptEvents.Stats.RequestStats);
  }
}
