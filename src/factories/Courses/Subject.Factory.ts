import { Module } from 'entities/Courses/Module.Entity';
import { Subject } from 'entities/Courses/Subject.Entity';
import { ISubjectFactory } from 'types/Factories/Factories.Interfaces';

export class SubjectFactory implements ISubjectFactory {
    create(name: string, module?: Module): Subject {
        const subject = new Subject();
        subject.name = name;

        if (module) {
            subject.modules = [module];
        }

        return subject;
    }
}
