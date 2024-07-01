import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { Module } from 'entities/Courses/Module.Entity';
import { IModuleFactory } from 'interfaces/Factories/IFactories';

export class ModuleFactory implements IModuleFactory {
    create(name: string, degreePath: DegreePath): Module {
        const module = new Module();
        module.name = name;
        module.degreePath = degreePath;

        return module;
    }
}
