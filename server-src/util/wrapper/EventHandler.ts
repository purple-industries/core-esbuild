import { off,emit, emitClient, on, onClient, Player } from 'alt-server';
export class EventHandler {
  private static registeredEvents: RegisteredEvent[] = [];
  private static currentHighestEventID: 1;

  /**
   * handles a server event
   * @param name
   * @param callback
   */
  public static onServerEvent(name: string, callback: (...args: any[]) => void) {
    on(name, callback);
    EventHandler.registeredEvents.push(new RegisteredEvent(name, EventHandler.currentHighestEventID++, callback));
  }

  /**
   * handles a client event
   * @param name
   * @param callback
   */
  public static onClientEvent(name: string, callback: (...args: any[]) => void){
    onClient(name, callback);
    EventHandler.registeredEvents.push(new RegisteredEvent(name, EventHandler.currentHighestEventID++, callback));
  }

  /**
   * calls a server event
   * @param name
   * @param args
   */
  public static callServerEvent(name: string, ...args:any[]){
    emit(name, args);
  }

  /**
   * calls a client event for all
   * @param name
   * @param args
   */
  public static emitAllClients(name: string, ...args: any[]) {
    emitClient(null,name, ...args);
  }

  /**
   * calls a client event for a specific player
   * @param player
   * @param name
   * @param args
   */
  public static emitClient(player: Player|null, name: string, ...args: any[]) {
    emitClient(player,name, ...args);
  }

  public static removeEvent(id: number) {
    let index: number = EventHandler.registeredEvents.findIndex(event => event.id === id);
    if (index === -1)
      return;
    let event: RegisteredEvent = EventHandler.registeredEvents[index];
    off(event.name, event.callback);
    EventHandler.registeredEvents.splice(index, 1);
  }
}

class RegisteredEvent {
  readonly _name: string;
  readonly _callback: () => void;
  readonly _id: number;

  constructor(name: string, id: number, callback: (...args: any[]) => void) {
    this._name = name;
    this._callback = callback;
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  get id(): number {
    return this._id;
  }

  get callback(): () => void {
    return this._callback;
  }
}
