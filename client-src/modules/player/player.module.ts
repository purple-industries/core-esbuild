import { ScriptEvents } from "@southside-shared/constants/ScriptEvents";
import { Module } from "@southside-shared/util/module.decorator";
import alt from "alt-client";
import { log } from "alt-shared";
import { OnServer } from "../../util/decorator/EventDecorator";
import { AuthComponent } from "./auth/auth.component";

@Module({
	components: [AuthComponent],
})
export class PlayerModule {
	@OnServer(ScriptEvents.Client.ConnectionComplete)
	public OnConnectionComplete() {
		log("Player connected");
		alt.setStat("stamina", 100);
		alt.setWatermarkPosition(3);
	}
}
