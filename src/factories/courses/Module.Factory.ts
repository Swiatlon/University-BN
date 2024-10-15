import { DegreePath } from 'entities/courses/DegreePath.Entity';
import { Module } from 'entities/courses/Module.Entity';
import { IModuleFactory } from 'types/factories/Factory.Interfaces';

export class ModuleFactory implements IModuleFactory {
    create(name: string, degreePath: DegreePath): Module {
        const module = new Module();
        module.name = name;
        module.degreePath = degreePath;

        return module;
    }
}
