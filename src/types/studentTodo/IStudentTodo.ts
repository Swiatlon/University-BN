import { Student } from 'entities/students/Student.Entity';

export interface IStudentTodo {
    id: number;
    title: string;
    description: string;
    student: Student;
    endDate: Date;
    color: string;
}
