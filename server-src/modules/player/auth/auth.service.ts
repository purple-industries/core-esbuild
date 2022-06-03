import { User } from '@southside-server/modules/database/entities/User';
import { IDiscordUser } from '@southside-shared/interfaces/IDiscordUser';
import { Singleton } from '@southside-shared/util/di.decorator';
import { Player } from 'alt-server';
import { UserStats } from '@southside-server/modules/database/entities/UserStats';

@Singleton
export class AuthService {
  public async doesAccountExist(discordId: string): Promise<User | null> {
    return await User.findOne({ where: { discordId: discordId } });
  }

  public async createAccount(player: Player, userData: IDiscordUser): Promise<void> {
    let user = new User();
    user.username = userData.username;
    user.discordId = userData.id;
    user.discordAvatarId = userData.avatar;
    user.hwidHash = player.hwidHash;
    user.hwidHashEx = player.hwidExHash;
    user.lastIp = player.ip;

    let userStats = new UserStats();
    userStats.kills = 0;
    userStats.deaths = 0;

    user.stats = userStats;
    await user.save();
  }

  public async loginUser(player: Player, user: User): Promise<void> {
    user.lastIp = player.ip;
    await user.save();

    player.user = user;
    console.log('User logged in!');
  }
}
