import { IServerEvent } from "alt-server";
import { container } from "tsyringe";
import { EventService } from "./../wrapper/event.service";

export function On(eventName?: string | keyof IServerEvent) {
	return (
		object: Object,
		propertyName: string,
		descriptor: PropertyDescriptor
	): void => {
		container
			.resolve(EventService)
			.onServerEvent(
				eventName ?? propertyName,
				descriptor.value,
				object.constructor
			);
	};
}

export function OnClient(eventName?: string) {
	return (
		object: Object,
		propertyName: string,
		descriptor: PropertyDescriptor
	): void => {
		container
			.resolve(EventService)
			.onClientEvent(
				eventName ?? propertyName,
				descriptor.value,
				object.constructor
			);
	};
}
