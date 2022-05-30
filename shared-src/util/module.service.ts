import { components, modules } from './ModuleDecorator';
import { constructor } from 'tsyringe/dist/typings/types';
import { container, singleton } from 'tsyringe';

@singleton()
export class ModuleService {
  constructor() {
    this.initialize();
  }

  private initialize() {
    this.resolveFromContainer(modules);
    this.resolveFromContainer(components);
  }

  private resolveFromContainer(tokens: constructor<any>[]) {
    if (tokens.length > 0)
      tokens.forEach((token: constructor<any>) => container.resolve(token));
  }
}
