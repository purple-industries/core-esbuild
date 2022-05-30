import alt from 'alt-client';
import { WebViewHandler } from './WebViewHandler';

export class EventHandler {
  private static registeredEvents: RegisteredEvent[] = [];
  private static currentHighestEventID: 1;

  constructor() {
    EventHandler.onWebView('client:CallServerEvent', EventHandler.emitWebViewToServer);
  }

  /**
   * Bridge for events directly from webview to server
   * @param eventName
   * @param value
   */
  static emitWebViewToServer(eventName: string, value: any): void {
    alt.log(eventName, value);
    EventHandler.emitServerEvent(eventName, value);
  }

  /**
   * Adds a handler for clientside events
   * @param name
   * @param callback
   */
  public static onEvent(name: string, callback: (...args: any[]) => void) {
    alt.on(name, callback);
    EventHandler.registeredEvents.push(new RegisteredEvent(name, EventHandler.currentHighestEventID++, callback));
  }

  /**
   * Receives an event from the webview
   * @param name
   * @param callback
   */
  public static onWebView(name: string, callback: (...args: any[]) => void) {
    WebViewHandler.browserSource.on(name, callback);
    EventHandler.registeredEvents.push(new RegisteredEvent(name, EventHandler.currentHighestEventID++, callback));
  }

  /**
   * emits an event to the Webview
   * @param name
   * @param args
   */
  public static emitWebView(name: string, ...args: any[]) {
    WebViewHandler.browserSource.emit(name, ...args);
  }


  /**
   * adds a handler for serverside events
   * @param name
   * @param callback
   */
  public static onServerEvent(name: string, callback: (...args: any[]) => void) {
    alt.onServer(name, callback);
    EventHandler.registeredEvents.push(new RegisteredEvent(name, EventHandler.currentHighestEventID++, callback));
  }

  /**
   * Calls a clientside event
   * @param name
   * @param args
   */
  public static emitClientEvent(name: string, ...args: any[]) {
    alt.emit(name, ...args);
  }

  /**
   * calls a serverside event
   * @param name
   * @param args
   */
  public static emitServerEvent(name: string, ...args: any[]) {
    alt.emitServer(name, ...args);
  }

  public static removeEventByID(id: number) {
    let index: number = EventHandler.registeredEvents.findIndex(event => event.id === id);
    if (index === -1)
      return;
    let event: RegisteredEvent = EventHandler.registeredEvents[index];
    alt.off(event.name, event.callback);
    EventHandler.registeredEvents.splice(index, 1);
  }

  public static removeEventByName(name: string) {
    let index: number = EventHandler.registeredEvents.findIndex(event => event.name === name);
    if (index === -1)
      return;
    let event: RegisteredEvent = EventHandler.registeredEvents[index];
    alt.off(event.name, event.callback);
    EventHandler.registeredEvents.splice(index, 1);
  }
}

class RegisteredEvent {
  readonly _name: string;
  readonly _callback: () => void;
  readonly _id: number;

  get name(): string {
    return this._name;
  }

  get id(): number {
    return this._id;
  }

  get callback(): () => void {
    return this._callback;
  }

  constructor(name: string, id: number, callback: (...args: any[]) => void) {
    this._name = name;
    this._callback = callback;
    this._id = id;
  }
}
