import { Entity, ManyToMany, OneToMany } from 'typeorm';
import { Module } from './Module.Entity';
import { CoursesBaseSchema } from 'entities/schemas/Courses.Schema';
import { DegreeCourse } from './DegreeCourse.Entity';
import { ISubject } from 'types/courses/Courses.Interfaces';
import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';

@Entity('Subjects')
export class Subject extends CoursesBaseSchema implements ISubject {
    @ManyToMany(() => Module, (module) => module.subjects)
    modules: Module[];

    @ManyToMany(() => DegreeCourse, (degreeProgram) => degreeProgram.subjects)
    degreeCourses: DegreeCourse[];

    @OneToMany(() => Grade, (grade) => grade.subject, { cascade: true })
    grades: Grade[];
}
