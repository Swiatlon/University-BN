import { StudentDegreeCourse } from 'entities/studentDegrees/StudentDegreeCourse.Entity';
import { Student } from 'entities/students/Student.Entity';
import { DegreeCourse } from 'entities/courses/DegreeCourse.Entity';
import { IStudentDegreeCourseFactory } from 'types/factories/Factory.Interfaces';

export class StudentDegreeCourseFactory implements IStudentDegreeCourseFactory {
    create(student: Student, degreeCourse: DegreeCourse): StudentDegreeCourse {
        const studentDegreeCourse = new StudentDegreeCourse();
        studentDegreeCourse.student = student;
        studentDegreeCourse.degreeCourse = degreeCourse;

        return studentDegreeCourse;
    }
}
