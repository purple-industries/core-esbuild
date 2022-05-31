import { EventHandler } from '../wrapper/EventHandler';
import { container } from 'tsyringe';


export function On(eventName?: string) {
  return (object: Object, propertyName: string, descriptor: PropertyDescriptor): void => {
    container.resolve(EventHandler).onServerEvent(
        eventName ?? propertyName,
        descriptor.value,
        object.constructor
    );
  };
}


export function OnClient(eventName?: string) {
  return (object: Object, propertyName: string, descriptor: PropertyDescriptor): void => {
    container.resolve(EventHandler).onClientEvent(
        eventName ?? propertyName,
        descriptor.value,
        object.constructor
    );
  };
}

