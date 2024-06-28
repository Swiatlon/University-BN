import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Student } from 'entities/Students/Student.Entity';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { IStudentDegreeCourse } from 'interfaces/StudentDegree/IStudentDegree';

@Entity('Student_Degree_Courses')
export class StudentDegreeCourse implements IStudentDegreeCourse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Student, (student) => student.degreeCourses)
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @ManyToOne(() => DegreeCourse, (degreeCourse) => degreeCourse.studentCourses)
    @JoinColumn({ name: 'degree_course_id' })
    degreeCourse: DegreeCourse;
}
