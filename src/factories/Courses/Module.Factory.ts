import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { Module } from 'entities/Courses/Module.Entity';

export class ModuleFactory {
    create(name: string, degreePath: DegreePath): Module {
        const module = new Module();
        module.name = name;
        module.degreePath = degreePath;

        return module;
    }
}
