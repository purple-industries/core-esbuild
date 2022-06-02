import { On } from "@southside-server/util/decorator/EventDecorators";
import { ScriptEvents } from "@southside-shared/constants/ScriptEvents";
import { Module } from "@southside-shared/util/module.decorator";
import { Player } from "alt-server";
import { AuthComponent } from "./auth/auth.component";

@Module({
	components: [AuthComponent],
})
export class PlayerModule {
	constructor() {}

	@On("playerConnect")
	public onPlayerConnect(player: Player) {
		player.emit(ScriptEvents.Client.ConnectionComplete);
	}
}
