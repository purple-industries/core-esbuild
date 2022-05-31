import { PlayerModule } from './player/player.module';
import { Module } from '@southside-shared/util/module.decorator';

@Module({
  imports: [PlayerModule]
})
export class ClientSystemModule {

}
