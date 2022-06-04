import { IDiscordUser } from '@southside-shared/interfaces/IDiscordUser';
import { Singleton } from '@southside-shared/util/di.decorator';
import { HttpClient } from 'alt-client';

@Singleton
export class AuthService {
  public async getUserDataFromToken(
      token: string
  ): Promise<IDiscordUser | null> {
    const httpClient = new HttpClient();
    httpClient.setExtraHeader('Authorization', 'Bearer ' + token);
    const result = await httpClient.get(
        'https://discord.com/api/users/@me'
    );

    if (result.statusCode !== 200) return null;
    return JSON.parse(result.body);
  }
}
