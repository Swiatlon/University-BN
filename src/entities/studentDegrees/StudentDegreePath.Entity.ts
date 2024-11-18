import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Student } from 'entities/students/Student.Entity';
import { DegreePath } from 'entities/courses/DegreePath.Entity';
import { DegreeCourse } from 'entities/courses/DegreeCourse.Entity';
import { IStudentDegreePath } from 'types/studentDegree/StudentDegree.Interfaces';

@Entity('Student_Degree_Paths')
export class StudentDegreePath implements IStudentDegreePath {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.degreePaths)
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @ManyToOne(() => DegreePath, (degreePath) => degreePath.studentPaths)
    @JoinColumn({ name: 'degree_path_id' })
    degreePath: DegreePath;

    @ManyToOne(() => DegreeCourse, (degreeCourse) => degreeCourse.studentPaths)
    @JoinColumn({ name: 'degree_course_id' })
    degreeCourse: DegreeCourse;
}
