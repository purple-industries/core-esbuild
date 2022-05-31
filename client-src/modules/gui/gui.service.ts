import { WebviewService } from '../../util/handler/WebViewHandler';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import { singleton } from 'tsyringe';
import alt from 'alt-client';

@singleton()
export class GuiService extends WebviewService {

  public isGuiOpen: boolean = false;


  public initWebview(): void {
    this.url = 'http://localhost:3000/';
    this.name = 'main';
    this.isOverlay = false;
    this.routeToEventName = ScriptEvents.Webview.RouteTo;
    this.start().then(view => {
      alt.log('cef loaded');
    });
    this.setInteractive(true);
  }

  /**
   * Changes the interactive state
   * @param {boolean} toggle
   * @returns {GuiService}
   */
  public setInteractive(toggle: boolean): GuiService {
    toggle ? this.enableInteraction() : this.disableInteraction();
    return this;
  }

  public setRoute(route: string) {
    this.emit(ScriptEvents.Webview.RouteTo, route);
  }

  /**
   * Enables the interactions with the webview
   * @private
   */
  private enableInteraction(): void {
    this.focus();
    this.showCursor();

    this.isGuiOpen = true;
  }

  /**
   * Disables the interactions with the webview
   * @private
   */
  private disableInteraction(): void {
    this.unfocus();
    this.removeCursor();

    this.isGuiOpen = false;
  }
}
