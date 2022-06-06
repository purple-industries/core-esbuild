import { Module } from '@southside-shared/util/module.decorator';
import { GuiModule } from './gui/gui.module';
import { PlayerModule } from './player/player.module';
import { On } from '@southside-client/util/decorator/EventDecorator';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import alt from 'alt-client';
import { GameModeType } from '@southside-shared/enums/LobbyType.enums';

@Module({
  imports: [PlayerModule, GuiModule]
})
export class ClientSystemModule {
  @On('consoleCommand')
  public handleConsoleCommand(name: string, ...args: any[]) {
    console.log(name);
    if (name === 'queueup') {
      alt.emitServer(ScriptEvents.Queue.Register, GameModeType.OneVsOne);
    }
  }
}
