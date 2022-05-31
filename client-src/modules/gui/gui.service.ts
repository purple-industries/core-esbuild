import { WebviewService } from '../../util/handler/WebViewHandler';
import { ScriptEvents } from '@southside-shared/constants/ScriptEvents';
import { container, InjectionToken, singleton } from 'tsyringe';
import { nextTick, Vector2 } from 'alt-shared';
import { WebView } from 'alt-client';
import { removeAllCursors, removeCursor, showCursor } from '../../util/handler/WebviewHelper';
import { EventHandler } from '../../util/handler/EventHandler';

@singleton()
export class GuiService {
  /**
   * Url for webview
   *
   * @type {string}
   */
  public url: string;
  /**
   * Contains the name as identifier for reflection
   *
   * @type {string}
   */
  public name: string;
  /**
   * Render as overlay
   *
   * @type {boolean}
   */
  public isOverlay: boolean = false;
  /**
   * Custom webview postion
   * @type {Vector2}
   */
  public position: Vector2;
  /**
   * Custom Webview Size
   *
   * @type {Vector2}
   */
  public size: Vector2;
  /**
   * Hash of objet to render on
   *
   * @type {number}
   */
  public propHash: number;
  /**
   * Name of objects texture to replace
   *
   * @type {string}
   */
  public targetTexture: string;
  public isGuiOpen: boolean = false;
  /**
   * Route name event if the webview is an spa
   * @type {string}
   * @protected
   */
  protected routeToEventName: string = 'routeTo';
  /**
   * Contains the webview instance
   *
   * @type {WebView}
   * @private
   */
  private webView: WebView;

  /**
   * Return the alt:V CEF Instance
   *
   * @return {WebView}
   */
  get webviewInstance(): WebView {
    return this.webView;
  }

  constructor(private readonly eventHandler: EventHandler) {}

  /**
   * Start the webview instance
   *
   * @return {Promise<WebView | Error>}
   */
  public start(): Promise<WebView | Error> {
    return new Promise((resolve, reject) => {
      if (!this.url) {
        reject(new Error('No route defined'));
      }

      this.webView = this.loadSpecificWebview();

      this.webView.on('load', () => {
        this.sendEventToServer();
        this.receiveEventFromServer();
        resolve(this.webView);
      });


    });
  }

  /**
   * Add cursor for gui
   *
   * @return {WebviewService}
   */
  public showCursor(): WebviewService {
    showCursor();
    return this;
  }

  /**
   * Remove cursor from gui
   *
   * @return {WebviewService}
   */
  public removeCursor(): WebviewService {
    removeCursor();
    return this;
  }

  /**
   * Remove all cursors from gui
   *
   * @return {WebviewService}
   */
  public removeAllCursor(): WebviewService {
    removeAllCursors();
    return this;
  }

  /**
   * Focus the webview
   *
   * @return {WebviewService}
   */
  public focus(): WebviewService {
    this.webView.focus();
    return this;
  }

  /**
   * Unfocus the webview
   *
   * @return {WebviewService}
   */
  public unfocus(): WebviewService {
    this.webView.unfocus();
    return this;
  }

  /**
   * Destroy the webview
   */
  public destroy(): void {
    if (this.webView.valid) {
      this.webView.destroy();
    }
  }

  /**
   * Emit event to webview
   *
   * @param {string} eventName
   * @param args
   * @return {WebviewService}
   */
  public emit(eventName: string, ...args: any[]): WebviewService {
    this.webView.emit(eventName, ...args);
    return this;
  }

  /**
   * Listen to webview Event
   *
   * @param {string} eventName
   * @param callback
   * @param context
   */
  //TODO: THIS CAUSES CIRCULAR DEPENCENCY. NEEDS FIX
  public on(eventName: string, callback: Function, context: Object): void {
    nextTick(() => {
      this.webView.on(eventName, callback.bind(container.resolve(context as InjectionToken)));
    });
  }

  /**
   * Listen to webview Event once
   *
   * @param {string} eventName
   * @param {(...args: any[]) => void} listener
   */
  public once(eventName: string, listener: (...args: any[]) => void) {
    this.webView.once(eventName, listener);
  }

  public initWebview(): void {
    this.url = 'http://localhost:3000/';
    this.name = 'main';
    this.isOverlay = false;
    this.routeToEventName = ScriptEvents.Webview.RouteTo;
    this.start().then(view => {

    });

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

  /**
   * Render a webview based on given params
   *
   * @return {WebView}
   * @private
   */
  private loadSpecificWebview(): WebView {
    let webview: WebView;

    if (this.propHash && this.targetTexture) {
      webview = new WebView(this.url, this.propHash, this.targetTexture);
    } else if (this.position || (this.position && this.size)) {
      webview = new WebView(this.url, this.position, this?.size);
    } else if (this.isOverlay && this.position && this.size) {
      webview = new WebView(this.url, this.isOverlay, this.position, this.size);
    } else {
      webview = new WebView(this.url, this.isOverlay);
    }

    return webview;
  }

  /**
   * Listen to event from gui and emit to server
   *
   * @private
   */
  private sendEventToServer(): void {
    this.on(ScriptEvents.Webview.EmitToServer, (eventName: string, ...args: any[]) => {
      this.eventHandler.emitServerEvent(ScriptEvents.Webview.EmitToServer, eventName, ...args);
    }, this);
  }

  /**
   * Receive event from server and emit to all webviews
   *
   * @private
   */
  private receiveEventFromServer(): void {
    this.eventHandler.onServerEvent(
        ScriptEvents.Webview.EmitToGuiFromServer,
        (eventName: string, ...args: any[]) => {
          this.emit(eventName, ...args);
        },
        this
    );
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
