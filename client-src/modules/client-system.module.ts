import { Module } from '../../shared-src/util/ModuleDecorator';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [PlayerModule]
})
export class ClientSystemModule {

}
