import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import type { IDiscordUser } from '@southside-shared/interfaces/IDiscordUser';
import { Component } from '@southside-shared/util/di.decorator';
import { Player, Vector3 } from 'alt-server';
import { OnClient } from 'server-src/util/decorator/EventDecorators';
import { AuthService } from './auth.service';

@Component
export class AuthComponent {
  constructor(private readonly authService: AuthService) {}

  @OnClient(ScriptEvents.Auth.SendUserDataToServer)
  public async handleSendUserDataToServer(
      player: Player,
      userData: IDiscordUser
  ) {
    const user = await this.authService.doesAccountExist(userData.id);
    user
        ? await this.authService.loginUser(player, user)
        : await this.authService.createAccount(player, userData);

    player.spawn(162.01318359375, -1007.103271484375, 29.4483642578125);
    player.rot = new Vector3(0, 0, 2.7211);
    player.model = 'mp_m_freemode_01';
    player.killStreak = 0;
    player.emit(
        ScriptEvents.Stats.ReceiveStats,
        { name: player.user.username, kills: player.user.stats.kills, deaths: player.user.stats.deaths }
    );
  }
}
