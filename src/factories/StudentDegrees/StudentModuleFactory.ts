import { StudentModule } from 'entities/StudentDegrees/StudentModule.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { Module } from 'entities/Courses/Module.Entity';
import { IStudentModuleFactory } from 'interfaces/Factories/IFactories';

export class StudentModuleFactory implements IStudentModuleFactory {
    create(student: Student, module: Module): StudentModule {
        const studentModule = new StudentModule();
        studentModule.student = student;
        studentModule.module = module;
        return studentModule;
    }
}
