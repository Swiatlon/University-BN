import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { ModuleFactory } from 'factories/Courses/Module.Factory';

describe('ModuleFactory', () => {
    it('should create a Module with the passed name and degree path', () => {
        const degreePath = new DegreePath();
        degreePath.name = 'Software Engineering';

        const moduleFactory = new ModuleFactory();
        const module = moduleFactory.create('Introduction to Programming', degreePath);

        expect(module.name).toBe('Introduction to Programming');
        expect(module.degreePath).toBe(degreePath);
    });
});
