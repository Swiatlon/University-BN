import { Entity, ManyToMany } from 'typeorm';
import { Module } from './Module.Entity';
import { CoursesBaseSchema } from 'entities/Schemas/Courses.Schema';
import { ISubject } from 'interfaces/Courses/ICourses';
import { DegreeCourse } from './DegreeCourse.Entity';

@Entity('Subjects')
export class Subject extends CoursesBaseSchema implements ISubject {
    @ManyToMany(() => Module, (module) => module.subjects)
    modules: Module[];

    @ManyToMany(() => DegreeCourse, (degreeProgram) => degreeProgram.subjects)
    degreeCourses: DegreeCourse[];
}
