import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { Module } from 'entities/Courses/Module.Entity';
import { Subject } from 'entities/Courses/Subject.Entity';

export interface ICoursesBaseSchema {
    id: string;
    name: string;
}

export interface IDegreeCourse extends ICoursesBaseSchema {
    degreePaths: DegreePath[];
    subjects: Subject[];
}

export interface IDegreePath extends ICoursesBaseSchema {
    degreeCourse: DegreeCourse;
    modules: Module[];
}

export interface IModule extends ICoursesBaseSchema {
    degreePath: DegreePath;
    subjects: Subject[];
}

export interface ISubject extends ICoursesBaseSchema {
    degreeCourses: DegreeCourse[];
    modules: Module[];
}
