import { Module } from 'entities/Courses/Module.Entity';
import { Subject } from 'entities/Courses/Subject.Entity';

export class SubjectFactory {
    create(name: string, module?: Module): Subject {
        const subject = new Subject();
        subject.name = name;

        if (module) {
            subject.modules = [module];
        }

        return subject;
    }
}
