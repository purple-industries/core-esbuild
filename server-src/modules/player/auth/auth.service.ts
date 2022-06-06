import { User } from '@southside-server/modules/database/entities/User';
import { IDiscordUser } from '@southside-shared/interfaces/IDiscordUser';
import { Singleton } from '@southside-shared/util/di.decorator';
import { Player } from 'alt-server';
import { UserStats } from '@southside-server/modules/database/entities/UserStats';

@Singleton
export class AuthService {
  public async doesAccountExist(player: Player, discordId: string): Promise<User> {
    return await User.findOne({ where: { discordId: discordId } });
  }

  public async createAccount(player: Player, userData: IDiscordUser): Promise<User> {
    let user = new User();
    user.username = userData.username;
    user.discordId = userData.id;
    user.discordAvatarId = userData.avatar;
    user.hwidHash = player.hwidHash;
    user.hwidHashEx = player.hwidExHash;
    user.lastIp = player.ip;
    user.isBanned = false;
    user.isAdmin = false;

    let userStats = new UserStats();
    userStats.kills = 0;
    userStats.deaths = 0;
    userStats.level = 1;
    userStats.xp = 0;

    user.stats = userStats;
    await user.save();
    return user;
  }

  public async loginUser(player: Player, user: User): Promise<void> {
    await this.checkUserBanned(player, user);

    user.lastIp = player.ip;
    await user.save();

    player.isLoggedIn = true;
    player.user = user;
    console.log(`User ${player.user.username} logged in!`);
  }

  private async checkUserBanned(player: Player, user: User): Promise<void> {
    let dbUser = await User.find({ where: { discordId: user.discordId } });
    if (user.isBanned) return player.kick('Du wurdest gesperrt. Bitte melde dich im Support!');

    dbUser = await User.find({ where: { hwidHashEx: user.hwidHashEx } });
    if (user.isBanned) return player.kick('Du wurdest gesperrt. Bitte melde dich im Support!');

    dbUser = await User.find({ where: { hwidHash: player.hwidHash } });
    if (user.isBanned) return player.kick('Du wurdest gesperrt. Bitte melde dich im Support!');

  }
}
