import { EventHandler } from '../handler/EventHandler';
import { container } from 'tsyringe';
import { GuiService } from '../../modules/gui/gui.service';

export function OnServer(eventName?: string) {
  return (object: Object, propertyName: string, descriptor: PropertyDescriptor): void => {
    container.resolve(EventHandler).onServerEvent(
        eventName ?? propertyName,
        descriptor.value,
        object.constructor
    );
  };
}

export function On(eventName?: string) {
  return (object: Object, propertyName: string, descriptor: PropertyDescriptor): void => {
    container.resolve(EventHandler).onClientEvent(
        eventName ?? propertyName,
        descriptor.value,
        object.constructor
    );
  };
}

export function OnWebview(eventName: string) {
  return (object: Object, propertyName: string, descriptor: PropertyDescriptor): void => {
    container.resolve(GuiService).on(
        eventName ?? propertyName,
        descriptor.value,
        object.constructor
    );
  };
}
