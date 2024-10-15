import { StudentModule } from 'entities/studentDegrees/StudentModule.Entity';
import { Student } from 'entities/students/Student.Entity';
import { Module } from 'entities/courses/Module.Entity';
import { IStudentModuleFactory } from 'types/factories/Factory.Interfaces';

export class StudentModuleFactory implements IStudentModuleFactory {
    create(student: Student, module: Module): StudentModule {
        const studentModule = new StudentModule();
        studentModule.student = student;
        studentModule.module = module;

        return studentModule;
    }
}
