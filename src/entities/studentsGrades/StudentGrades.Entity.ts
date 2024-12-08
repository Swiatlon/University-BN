import { GradeValueEnum, PassDateAttemptEnum } from 'constants/entities/entities.Constants';
import { Subject } from 'entities/courses/Subject.Entity';
import { Student } from 'entities/students/Student.Entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('Grades')
@Unique(['student', 'subject'])
export class Grade {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Student, (student) => student.studentGrades, { nullable: false })
    student!: Student;

    @ManyToOne(() => Subject, (subject) => subject.grades, { nullable: false })
    subject!: Subject;

    @Column({
        type: 'enum',
        enum: GradeValueEnum,
        nullable: true,
    })
    grade?: GradeValueEnum;

    @Column({
        type: 'enum',
        enum: PassDateAttemptEnum,
        nullable: true,
    })
    passDateAttempt?: PassDateAttemptEnum;
}
