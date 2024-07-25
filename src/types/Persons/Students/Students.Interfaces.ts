import { Role } from 'entities/Accounts/Role.Entity';
import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { StudentDegreePath } from 'entities/StudentDegrees/StudentDegreePath.Entity';
import { StudentModule } from 'entities/StudentDegrees/StudentModule.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { IPersonRelations } from '../Persons/Persons.Interfaces';

export interface IStudentRelations extends IPersonRelations {
    degreeCourses: StudentDegreeCourse[];
    degreePaths: StudentDegreePath[];
    modules: StudentModule[];
}

export interface IStudentWithRoles extends Student {
    roles: Role[];
}
