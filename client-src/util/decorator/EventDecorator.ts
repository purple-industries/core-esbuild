import { EventHandler } from '../handler/EventHandler';

export function OnServer(eventName?: string) {
  return (object: Object, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
    let originalMethod = descriptor.value;
    if (eventName) {
      EventHandler.onServerEvent(eventName, descriptor.value.bind(this));
    } else {
      EventHandler.onServerEvent(propertyName, descriptor.value.bind(this));
    }

    descriptor.value = function (...args: any[]) {
      return originalMethod.call(this, args);
    };
    return descriptor;
  };
}

export function On(eventName?: string) {
  return (object: Object, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
    let originalMethod = descriptor.value;
    if (eventName) {
      EventHandler.onEvent(eventName, descriptor.value.bind(this));
    } else {
      EventHandler.onEvent(propertyName, descriptor.value.bind(this));
    }
    descriptor.value = function (...args: any[]) {
      return originalMethod.call(this, args);
    };
    return descriptor;
  };
}

export function OnWebview(eventName: string) {
  return (object: Object, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
    let originalMethod = descriptor.value;
    EventHandler.onWebView(eventName, descriptor.value.bind(this));
    descriptor.value = function (...args: any[]) {
      return originalMethod.call(this, args);
    };
    return descriptor;
  };
}
