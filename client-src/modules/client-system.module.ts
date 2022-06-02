import { Module } from "@southside-shared/util/module.decorator";
import { GuiModule } from "./gui/gui.module";
import { PlayerModule } from "./player/player.module";

@Module({
	imports: [PlayerModule, GuiModule],
})
export class ClientSystemModule {}
