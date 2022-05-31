import { components, modules } from './ModuleDecorator';
import { Singleton } from '@southside-shared/util/di.decorator';
import { constructor } from '@southside-shared/util/IConstructor';
import { container } from 'tsyringe';

@Singleton
export class ModuleService {
  constructor() {
    this.initialize();
  }

  private initialize() {
    this.resolveFromContainer(modules);
    this.resolveFromContainer(components);
  }


  private resolveFromContainer(tokens: constructor<any>[]) {
    console.log(tokens);
    if (tokens.length > 0)
      tokens.forEach((token: constructor<any>) => container.resolve(token));
  }
}
