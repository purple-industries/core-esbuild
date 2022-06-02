import { Module } from "@southside-shared/util/module.decorator";
import "../extends/alt-player.prototype";
import { Database } from "./database/database.module";
import { PlayerModule } from "./player/player.module";
@Module({
	imports: [Database, PlayerModule],
})
export class ServerSystemModule {}
