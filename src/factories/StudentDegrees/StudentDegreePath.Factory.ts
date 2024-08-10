import { StudentDegreePath } from 'entities/StudentDegrees/StudentDegreePath.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { IStudentDegreePathFactory } from 'types/Factories/Factory.Interfaces';

export class StudentDegreePathFactory implements IStudentDegreePathFactory {
    create(student: Student, degreePath: DegreePath, degreeCourse: DegreeCourse): StudentDegreePath {
        const studentDegreePath = new StudentDegreePath();
        studentDegreePath.student = student;
        studentDegreePath.degreePath = degreePath;
        studentDegreePath.degreeCourse = degreeCourse;

        return studentDegreePath;
    }
}
