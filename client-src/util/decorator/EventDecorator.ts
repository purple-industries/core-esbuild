import { GuiService } from "@southside-client/modules/gui/gui.service";
import { IClientEvent } from "alt-client";
import { container } from "tsyringe";
import { EventHandler } from "../handler/EventHandler";

export function OnServer(eventName?: string) {
	return (
		object: Object,
		propertyName: string,
		descriptor: PropertyDescriptor
	): void => {
		container
			.resolve(EventHandler)
			.onServerEventDecorator(
				eventName ?? propertyName,
				descriptor.value,
				object.constructor
			);
	};
}

export function On(eventName?: string | keyof IClientEvent) {
	return (
		object: Object,
		propertyName: string,
		descriptor: PropertyDescriptor
	): void => {
		container
			.resolve(EventHandler)
			.onClientEventDecorator(
				eventName ?? propertyName,
				descriptor.value,
				object.constructor
			);
	};
}

export function OnWebview(eventName: string) {
	return (
		object: Object,
		propertyName: string,
		descriptor: PropertyDescriptor
	): void => {
		container
			.resolve(GuiService)
			.onDecorator(
				eventName ?? propertyName,
				descriptor.value,
				object.constructor
			);
	};
}
