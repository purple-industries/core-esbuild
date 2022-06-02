import alt, { emit, emitClient, nextTick, off, Player } from "alt-server";
import { container, InjectionToken, singleton } from "tsyringe";

@singleton()
export class EventService {
	private static registeredEvents: RegisteredEvent[] = [];
	private static currentHighestEventID: 1;

	/**
	 * handles a client event
	 * @param eventName
	 * @param callback
	 * @param context
	 */
	public onClientEvent(
		eventName: string,
		callback: Function,
		context: Object
	): void {
		nextTick(() => {
			alt.onClient(
				eventName,
				callback.bind(container.resolve(context as InjectionToken))
			);
		});
	}

	/**
	 * calls a server event
	 * @param name
	 * @param args
	 */
	public callServerEvent(name: string, ...args: any[]) {
		emit(name, args);
	}

	/**
	 * calls a client event for all
	 * @param name
	 * @param args
	 */
	public emitAllClients(name: string, ...args: any[]) {
		emitClient(null, name, ...args);
	}

	/**
	 * calls a client event for a specific player
	 * @param player
	 * @param name
	 * @param args
	 */
	public emitClient(player: Player | null, name: string, ...args: any[]) {
		emitClient(player, name, ...args);
	}

	public removeEvent(id: number) {
		let index: number = EventService.registeredEvents.findIndex(
			(event) => event.id === id
		);
		if (index === -1) return;
		let event: RegisteredEvent = EventService.registeredEvents[index];
		off(event.name, event.callback);
		EventService.registeredEvents.splice(index, 1);
	}

	/**
	 * handles a server event
	 * @param eventName
	 * @param callback
	 * @param context
	 */
	public onServerEvent(
		eventName: string,
		callback: Function,
		context: Object
	): void {
		nextTick(() => {
			alt.on(
				eventName,
				callback.bind(container.resolve(context as InjectionToken))
			);
		});
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
