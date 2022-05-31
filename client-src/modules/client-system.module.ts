import { PlayerModule } from './player/player.module';
import { Module } from '@southside-shared/util/ModuleDecorator';
import { GuiModule } from './gui/gui.module';

@Module({
  imports: [PlayerModule, GuiModule]
})
export class ClientSystemModule {

}
