import { PlayerModule } from './player/player.module';
import { Module } from '@southside-shared/util/ModuleDecorator';

@Module({
  imports: [PlayerModule]
})
export class ClientSystemModule {

}
