import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Student } from 'entities/students/Student.Entity';
import { Module } from 'entities/courses/Module.Entity';
import { IStudentModule } from 'types/studentDegree/StudentDegree.Interfaces';

@Entity('Student_Modules')
export class StudentModule implements IStudentModule {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Student, (student) => student.modules)
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @ManyToOne(() => Module, (module) => module.studentModules)
    @JoinColumn({ name: 'module_id' })
    module: Module;
}
