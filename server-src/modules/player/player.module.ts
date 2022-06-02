import { Module } from "@southside-shared/util/module.decorator";
import { Player, Vector3 } from "alt-server";
import { On } from "../../util/decorator/EventDecorators";

@Module()
export class PlayerModule {
	constructor() {}

	@On("playerConnect")
	public onPlayerConnect(player: Player) {
		player.spawn(162.01318359375, -1007.103271484375, 29.4483642578125);
		player.rot = new Vector3(0, 0, 2.7211);
		player.model = "mp_m_freemode_01";
	}
}
