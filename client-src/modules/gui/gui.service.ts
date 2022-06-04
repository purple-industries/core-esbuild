import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import { Singleton } from '@southside-shared/util/di.decorator';
import alt from 'alt-client';
import { WebviewService } from '../../util/handler/WebViewHandler';
import { INotification } from '@southside-shared/interfaces/INotification';

@Singleton
export class GuiService extends WebviewService {
  public isGuiOpen: boolean = false;

  public initWebview(): void {
    this.url = 'http://localhost:3000/';
    this.name = 'main';
    this.isOverlay = false;
    this.routeToEventName = ScriptEvents.Webview.RouteTo;
    this.start().then((view) => {
      alt.log('cef loaded');
      this.listenWebviewToServer();
      this.listenServerToWebview();
      this.listenToNotifications();
    });
    this.setInteractive(false);
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

  public setDefaultRoute() {
    this.setInteractive(false);
    this.setRoute('/');
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

  private listenServerToWebview() {
    alt.onServer(ScriptEvents.Webview.EmitToGuiFromServer, (eventName: string, ...args: any[]) => {
      alt.log(`received from server: ${eventName}`);
      this.webviewInstance.emit(eventName, args);
    });
  }

  private listenWebviewToServer() {
    this.webviewInstance.on(ScriptEvents.Webview.EmitToServer, (eventName: string, ...args: any[]) => {
      alt.log(`received from gui: ${eventName}`);
      alt.emitServer(eventName, args);
    });
  }

  private listenToNotifications() {
    alt.onServer(ScriptEvents.Notification.Receive, (notification: INotification) => {
      console.log(notification);
      this.webviewInstance.emit(ScriptEvents.Notification.Receive, notification);
    });
  }
}
