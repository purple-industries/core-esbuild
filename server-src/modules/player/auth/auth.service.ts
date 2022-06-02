import { User } from "@southside-server/modules/database/entities/User";
import { IDiscordUser } from "@southside-shared/interfaces/IDiscordUser";
import { Singleton } from "@southside-shared/util/di.decorator";
import { Player } from "alt-server";

@Singleton
export class AuthService {
	public async doesAccountExist(discordId: string): Promise<null | User> {
		const user = await User.findOne({ where: { discordId: discordId } });
		return user;
	}

	public async createAccount(player: Player, userData: IDiscordUser) {
		let user = new User();
		user.username = userData.username;
		user.discordId = userData.id;
		user.discordAvatarId = userData.avatar;
		user.lastIp = player.ip;
		user.save();
	}

	public loginUser(player: Player, user: User): void {
		player.user = user;
		console.log("User logged in!");
	}
}
