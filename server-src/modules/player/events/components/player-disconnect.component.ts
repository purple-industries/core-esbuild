import { On } from '@southside-server/util/decorator/EventDecorators';
import { Component } from '@southside-shared/util/di.decorator';
import alt, { Player } from 'alt-server';

@Component
export class PlayerDisconnectComponent {

  constructor() {
    process.on('SIGINT', this.handleInterrupt.bind(this));
  }

  @On('playerDisconnect')
  public async handlePlayerDisconnect(player: Player, reason: string) {
    await player.user.save();
    player.isLoggedIn = false;
    alt.log(`Player ${player.user.username} left the server!"`);
  }

  private async handleInterrupt() {
    process.stdin.resume();
    await this.savePlayers();
    process.exit();
  }

  private async savePlayers(): Promise<void> {
    for (const player of alt.Player.all) {
      if (!player.isLoggedIn) continue;
      await player.user.save();
      alt.log(`Player ${player.user.username} saved!`);
    }
  }
}
