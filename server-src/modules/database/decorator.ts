import { Entity, EntityOptions } from 'typeorm';
import { constructor } from 'tsyringe/dist/typings/types';

export let registeredEntities: constructor<any>[] = [];

export function AddEntity(option?: EntityOptions): (target: constructor<any>) => void {
  return function (target: constructor<any>) {
    const doesEntityExists = registeredEntities.find((entity: constructor<any>) => entity === target);
    if(doesEntityExists) return false;

    Entity(option)(target);
    registeredEntities.push(target);
    return target;
  }
}
