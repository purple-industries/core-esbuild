import { ScriptEvents } from "@southside-shared/constants/ScriptEvents";
import { Component } from "@southside-shared/util/di.decorator";
import { Player } from "alt-server";
import { OnClient } from "server-src/util/decorator/EventDecorators";
import type { IDiscordUser } from "../../../../shared-src/interfaces/IDiscordUser";
import { AuthService } from "./auth.service";

@Component
export class AuthComponent {
	constructor(private readonly authService: AuthService) {}

	@OnClient(ScriptEvents.Auth.SendUserDataToServer)
	public async handleSendUserDataToServer(
		player: Player,
		userData: IDiscordUser
	) {
		console.log(player.name);
		console.log(userData);

		const user = await this.authService.doesAccountExist(userData.id);
		user
			? this.authService.loginUser(player, user)
			: await this.authService.createAccount(player, userData);
	}
}
