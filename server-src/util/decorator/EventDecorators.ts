import { EventHandler } from '../wrapper/EventHandler';

export function OnServer(eventName?: string){
  return (object: Object, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
    let originalMethod = descriptor.value;
    if(eventName){
      EventHandler.onServerEvent(eventName, descriptor.value.bind(this));
    }
    else{
      EventHandler.onServerEvent(propertyName, descriptor.value.bind(this));
    }
    descriptor.value = function(...args: any[]) {
      return originalMethod.call(this, args);
    }
    return descriptor;
  };
}

export function OnClient(eventName?: string){
  return (object: Object, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
    let originalMethod = descriptor.value;
    if(eventName){
      EventHandler.onClientEvent(eventName, descriptor.value.bind(this));
    }
    else{
      EventHandler.onClientEvent(propertyName, descriptor.value.bind(this));
    }
    descriptor.value = function(...args: any[]){
      return originalMethod.call(this, args);
    }
    return descriptor
  };
}
