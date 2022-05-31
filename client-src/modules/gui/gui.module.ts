import { Module } from '@southside-shared/util/module.decorator';
import { GuiService } from './gui.service';
import { OnWebview } from '../../util/decorator/EventDecorator';
import alt from 'alt-client';


@Module({})
export class GuiModule {
  constructor(private readonly guiService: GuiService) {
    this.initialize();
  }

  public initialize() {
    this.guiService.initWebview();
  }

  @OnWebview('gui:test')
  public handleTest() {
    alt.log('hello from Web');
    this.guiService.setRoute('/about');
  }


}
