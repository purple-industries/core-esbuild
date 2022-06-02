import { Module } from "@southside-shared/util/module.decorator";
import { Database } from "./database/database.module";
import { PlayerModule } from "./player/player.module";

@Module({
	imports: [Database, PlayerModule],
})
export class ServerSystemModule {}
