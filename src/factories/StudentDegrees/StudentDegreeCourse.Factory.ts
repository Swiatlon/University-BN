import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { IStudentDegreeCourseFactory } from 'types/Factories/Factory.Interfaces';

export class StudentDegreeCourseFactory implements IStudentDegreeCourseFactory {
    create(student: Student, degreeCourse: DegreeCourse): StudentDegreeCourse {
        const studentDegreeCourse = new StudentDegreeCourse();
        studentDegreeCourse.student = student;
        studentDegreeCourse.degreeCourse = degreeCourse;

        return studentDegreeCourse;
    }
}
