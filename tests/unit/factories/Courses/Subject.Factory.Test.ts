import { SubjectFactory } from 'factories/Courses/Subject.Factory';
import { Module } from 'entities/Courses/Module.Entity';

describe('SubjectFactory', () => {
    let subjectFactory: SubjectFactory;

    beforeAll(() => {
        subjectFactory = new SubjectFactory();
    });

    it('should create a Subject with the passed name', () => {
        const subject = subjectFactory.create('Mathematics');

        expect(subject.name).toBe('Mathematics');
        expect(subject.modules).toBeUndefined();
    });

    it('should create a Subject with the passed name and module', () => {
        const module = new Module();
        module.name = 'Algebra';

        const subjectFactory = new SubjectFactory();
        const subject = subjectFactory.create('Mathematics', module);

        expect(subject.name).toBe('Mathematics');
        expect(subject.modules).toEqual([module]);
    });
});
