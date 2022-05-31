import alt, { nextTick } from 'alt-client';
import { container, InjectionToken, singleton } from 'tsyringe';

@singleton()
export class EventHandler {
  private static registeredEvents: RegisteredEvent[] = [];
  private static currentHighestEventID: 1;

  constructor() {
  }

  /**
   * Bridge for events directly from webview to server
   * @param eventName
   * @param value
   */
  public emitWebViewToServer(eventName: string, value: any): void {
    alt.log(eventName, value);
    this.emitServerEvent(eventName, value);
  }

  /**
   * Adds a handler for clientside events
   * @param eventName
   * @param callback
   * @param context
   */
  public onClientEvent(eventName: string, callback: Function, context: Object): void {
    nextTick(() => {
      alt.on(eventName, callback.bind(container.resolve(context as InjectionToken)));
    });

  }


  /**
   * adds a handler for serverside events
   * @param eventName
   * @param callback
   * @param context
   */
  public onServerEvent(eventName: string, callback: Function, context: Object): void {
    nextTick(() => {
      alt.onServer(eventName, callback.bind(container.resolve(context as InjectionToken)));
    });
  }

  /**
   * Calls a clientside event
   * @param name
   * @param args
   */
  public emitClientEvent(name: string, ...args: any[]) {
    alt.emit(name, ...args);
  }

  /**
   * calls a serverside event
   * @param name
   * @param args
   */
  public emitServerEvent(name: string, ...args: any[]) {
    alt.emitServer(name, ...args);
  }

  public removeEventByID(id: number) {
    let index: number = EventHandler.registeredEvents.findIndex(event => event.id === id);
    if (index === -1)
      return;
    let event: RegisteredEvent = EventHandler.registeredEvents[index];
    alt.off(event.name, event.callback);
    EventHandler.registeredEvents.splice(index, 1);
  }

  public removeEventByName(name: string) {
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
