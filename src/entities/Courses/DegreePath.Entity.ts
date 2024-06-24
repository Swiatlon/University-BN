import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DegreeCourse } from './DegreeCourse.Entity';
import { CoursesBaseSchema } from 'entities/Schemas/Courses.Schema';
import { IDegreePath } from 'interfaces/Courses/ICourses';
import { Module } from './Module.Entity';

@Entity('Degree_Paths')
export class DegreePath extends CoursesBaseSchema implements IDegreePath {
    @ManyToOne(() => DegreeCourse, (degreeCourse) => degreeCourse.degreePaths)
    @JoinColumn({ name: 'degree_course_id' })
    degreeCourse: DegreeCourse;

    @OneToMany(() => Module, (module) => module.degreePath)
    modules: Module[];
}
