import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './Student.Entity';
import { IStudentTodo } from 'types/studentTodo/IStudentTodo';

@Entity('Students_Todos')
export class StudentTodo implements IStudentTodo {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'text' })
    title!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column({ type: 'text' })
    color!: string;

    @ManyToOne(() => Student, (student) => student.todos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'student_id' })
    student!: Student;

    @Column({ type: 'timestamp', nullable: true })
    endDate: Date;
}
