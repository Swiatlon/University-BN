import { Module } from 'entities/courses/Module.Entity';
import { Subject } from 'entities/courses/Subject.Entity';
import { ISubjectFactory } from 'types/factories/Factory.Interfaces';

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
