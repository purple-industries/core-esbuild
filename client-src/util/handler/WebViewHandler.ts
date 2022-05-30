import alt from 'alt-client';
import native from 'natives';
import { EventHandler } from './EventHandler';

//TODO: Rewrite this shit
export class WebViewHandler {
  public static state = new Map<any, boolean>();
  public static pathToBrowser: string = 'http://resource/client/cef/index.html#/';
  public static browserSource: alt.WebView = new alt.WebView('http://resource/client/cef/index.html#/', false);
  public static controlInterval: any;
  public static isGUIActive: boolean = false;

  constructor() {
    EventHandler.onServerEvent('client:emitWebview', WebViewHandler.emitWebview);
    EventHandler.onServerEvent('client:playerLoadedAndReady', this.initBrowser);
    EventHandler.onServerEvent('client:setDefaultGUI', WebViewHandler.setDefaultGUI);
    EventHandler.onWebView('client:webView:ready', WebViewHandler.webViewReady);
  }


  public static webViewReady(): void {
    WebViewHandler.browserSource.focus();
    WebViewHandler.browserSource.off('client:webView:ready', WebViewHandler.webViewReady);
    EventHandler.emitServerEvent('playerConnectionComplete');
  }

  /**
   * emits an event to the webview
   * @param eventName
   * @param args
   */
  public static emitWebview(eventName: string, ...args: any): void {
    alt.setTimeout(() => {
      this.browserSource.emit(eventName, ...args);
    }, 150);

  }

  /**
   * sets the route to the gui
   * @param guiName
   */
  public static setRoute(guiName: string): void {
    WebViewHandler.browserSource.url = this.pathToBrowser + guiName;
  }

  /**
   * handles the gui change
   * @param guiName
   * @param viewState
   */
  public static handleGui(guiName: any, viewState: boolean): void {
    alt.setTimeout(() => {
      if (viewState === true) {
        WebViewHandler.state.set(guiName, viewState);
        this.setRoute(guiName);
        this.setInteractState(viewState);
      } else {
        WebViewHandler.state.set(guiName, viewState);
        this.setRoute('');
        this.setInteractState(viewState);
      }
    }, 150);
  }

  /**
   * sets the interact state (radar, movement and cursor)
   * @param state
   */
  static setInteractState(state: boolean): void {
    alt.showCursor(state);
    WebViewHandler.isGUIActive = state;
    native.displayRadar(!state);
    alt.setTimeout(() => {
      EventHandler.emitClientEvent('chat:disableChat', state);
    }, 500);

    if (!state) {
      alt.clearTimeout(WebViewHandler.controlInterval);
    } else {
      WebViewHandler.controlInterval = alt.setInterval(() => {
        native.disableAllControlActions(0);
        native.disableAllControlActions(1);
      }, 0);
    }
    WebViewHandler.browserSource.focus();

  }

  /**
   * sets the GUI to the default GUI
   */
  public static setDefaultGUI() {
    WebViewHandler.handleGui('', false);
    WebViewHandler.isGUIActive = false;
  }

  /**
   * initializes the browser on given event
   */
  public initBrowser() {
    alt.setTimeout(() => {

    }, 5000);
  }
}
