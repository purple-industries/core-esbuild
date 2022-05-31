import { injectable, singleton } from 'tsyringe';
import { constructor } from '@southside-shared/util/IConstructor';

export const Singleton = (targetConstructor: constructor<any>) => {
  singleton()(targetConstructor);
  return targetConstructor;
};

export const Injectable = (targetConstructor: constructor<any>) => {
  injectable()(targetConstructor);
  return targetConstructor;
};
