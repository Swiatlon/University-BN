import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DegreeCourse } from './DegreeCourse.Entity';
import { CoursesBaseSchema } from 'entities/schemas/Courses.Schema';
import { Module } from './Module.Entity';
import { StudentDegreePath } from 'entities/studentDegrees/StudentDegreePath.Entity';
import { IDegreePath } from 'types/courses/Courses.Interfaces';

@Entity('Degree_Paths')
export class DegreePath extends CoursesBaseSchema implements IDegreePath {
    @ManyToOne(() => DegreeCourse, (degreeCourse) => degreeCourse.degreePaths)
    @JoinColumn({ name: 'degree_course_id' })
    degreeCourse: DegreeCourse;

    @OneToMany(() => Module, (module) => module.degreePath)
    @JoinColumn({ name: 'module_id' })
    modules: Module[];

    @OneToMany(() => StudentDegreePath, (studentDegreePath) => studentDegreePath.degreePath)
    @JoinColumn({ name: 'student_path_id' })
    studentPaths: StudentDegreePath[];
}
