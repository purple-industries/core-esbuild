import { Module } from "@southside-shared/util/module.decorator";
import { GuiService } from "./gui.service";

@Module({})
export class GuiModule {
	constructor(private readonly guiService: GuiService) {
		this.initialize();
	}

	public initialize() {
		this.guiService.initWebview();
	}
}
