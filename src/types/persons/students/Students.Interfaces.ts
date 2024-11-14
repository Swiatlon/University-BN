import { Role } from 'entities/accounts/Role.Entity';
import { StudentDegreeCourse } from 'entities/studentDegrees/StudentDegreeCourse.Entity';
import { StudentDegreePath } from 'entities/studentDegrees/StudentDegreePath.Entity';
import { StudentModule } from 'entities/studentDegrees/StudentModule.Entity';
import { Student } from 'entities/students/Student.Entity';
import { IPersonRelations } from '../persons/Persons.Interfaces';
import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';

export interface IStudent extends IPersonRelations {
    id: number;
    degreeCourses: StudentDegreeCourse[];
    degreePaths: StudentDegreePath[];
    modules: StudentModule[];
    studentsGrades: Grade[];
}

export interface IStudentWithRoles extends Student {
    roles: Role[];
}
