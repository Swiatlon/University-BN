import { Student } from 'entities/Students/Student.Entity';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { Module } from 'entities/Courses/Module.Entity';

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

export interface StudentWithDegreeCourse {
    studentDegreeCourse_student_id: string;
}

export interface IDataFetcher {
    fetchAllData(): Promise<{
        degreeCoursesTree: DegreeCourse[];
        studentsWithoutDegreeCourses: Student[];
    }>;
}

export interface DegreeTree {
    [degreeCourseId: string]: {
        [degreePathId: string]: Module[];
    };
}

export interface IDegreeTreeBuilder {
    buildTree(degreeCourses: DegreeCourse[], degreePaths: DegreePath[]): DegreeTree;
}
