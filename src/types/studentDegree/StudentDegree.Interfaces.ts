import { Student } from 'entities/students/Student.Entity';
import { DegreeCourse } from 'entities/courses/DegreeCourse.Entity';
import { DegreePath } from 'entities/courses/DegreePath.Entity';
import { Module } from 'entities/courses/Module.Entity';

export interface IStudentDegreeCourse {
    id: string;
    student: Student;
    degreeCourse: DegreeCourse;
}

export interface IStudentDegreePath {
    id: string;
    student: Student;
    degreePath: DegreePath;
    degreeCourse: DegreeCourse;
}

export interface IStudentModule {
    id: string;
    student: Student;
    module: Module;
}

export interface IStudentWithDegreeCourse {
    studentDegreeCourse_student_id: string;
}

export interface IDataFetcherResult {
    degreeCoursesTree: DegreeCourse[];
    studentsWithoutDegreeCourses: Student[];
}

export interface IDataFetcher {
    fetchAllData(): Promise<IDataFetcherResult>;
}

export interface IDegreeTree {
    [degreeCourseId: string]: {
        [degreePathId: string]: Module[];
    };
}

export interface IDegreeTreeBuilder {
    buildTree(degreeCourses: DegreeCourse[], degreePaths: DegreePath[]): IDegreeTree;
}
