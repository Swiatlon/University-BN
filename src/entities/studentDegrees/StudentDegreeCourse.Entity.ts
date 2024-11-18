import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Student } from 'entities/students/Student.Entity';
import { DegreeCourse } from 'entities/courses/DegreeCourse.Entity';
import { IStudentDegreeCourse } from 'types/studentDegree/StudentDegree.Interfaces';

@Entity('Student_Degree_Courses')
export class StudentDegreeCourse implements IStudentDegreeCourse {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.degreeCourses)
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @ManyToOne(() => DegreeCourse, (degreeCourse) => degreeCourse.studentCourses)
    @JoinColumn({ name: 'degree_course_id' })
    degreeCourse: DegreeCourse;
}
