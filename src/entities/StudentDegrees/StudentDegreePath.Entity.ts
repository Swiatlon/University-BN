import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Student } from 'entities/Students/Student.Entity';
import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { IStudentDegreePath } from 'interfaces/StudentDegree/IStudentDegree';

@Entity('Student_Degree_Paths')
export class StudentDegreePath implements IStudentDegreePath {
    @PrimaryGeneratedColumn('uuid')
    id: string;

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
