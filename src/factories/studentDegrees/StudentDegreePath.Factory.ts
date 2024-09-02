import { StudentDegreePath } from 'entities/studentDegrees/StudentDegreePath.Entity';
import { Student } from 'entities/students/Student.Entity';
import { DegreePath } from 'entities/courses/DegreePath.Entity';
import { DegreeCourse } from 'entities/courses/DegreeCourse.Entity';
import { IStudentDegreePathFactory } from 'types/factories/Factory.Interfaces';

export class StudentDegreePathFactory implements IStudentDegreePathFactory {
    create(student: Student, degreePath: DegreePath, degreeCourse: DegreeCourse): StudentDegreePath {
        const studentDegreePath = new StudentDegreePath();
        studentDegreePath.student = student;
        studentDegreePath.degreePath = degreePath;
        studentDegreePath.degreeCourse = degreeCourse;

        return studentDegreePath;
    }
}
