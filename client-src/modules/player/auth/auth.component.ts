import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import type { IStats } from '@southside-shared/interfaces/IStats';
import { Component } from '@southside-shared/util/di.decorator';
import { Discord, emitServer } from 'alt-client';
import { OnServer, OnWebview } from 'client-src/util/decorator/EventDecorator';
import { GuiService } from './../../gui/gui.service';
import { AuthService } from './auth.service';

@Component
export class AuthComponent {
  constructor(
      private readonly guiService: GuiService,
      private readonly authService: AuthService
  ) {}

  @OnServer(ScriptEvents.Client.ConnectionComplete)
  public handleConnectionComplete() {
    this.guiService.setRoute('/auth');
    this.guiService.setInteractive(true);
  }

  @OnWebview(ScriptEvents.Auth.Request)
  public async handleAuthRequest() {
    const token = await Discord.requestOAuth2Token('854748697480527923');
    this.guiService.setDefaultRoute();

    const userData = await this.authService.getUserDataFromToken(token);
    emitServer(ScriptEvents.Auth.SendUserDataToServer, userData);
  }

  @OnServer(ScriptEvents.Stats.ReceiveStats)
  public handleReceiveStats(stats: IStats) {
    this.guiService.emit(ScriptEvents.Stats.ReceiveStats, stats);
  }
}
