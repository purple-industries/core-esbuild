import { constructor } from '@southside-shared/util/IConstructor';
import { container, singleton } from 'tsyringe';


export let modules: constructor<any>[] = [];
export let components: constructor<any>[] = [];

export function Module(options?: IModuleOptionsDecorator): (targetConstructor: constructor<any>) => void {
  if (options && (options.imports)) {
    modules.push(...options.imports);
  } else if (options && options.components) {
    components.push(...options.components);
  }

  return (targetConstructor: constructor<any>) => {
    singleton()(targetConstructor);
    container.resolve(targetConstructor);
  };

}


interface IModuleOptionsDecorator {
  imports?: constructor<any>[],
  components?: constructor<any>[]
}
