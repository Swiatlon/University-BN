import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Student } from 'entities/Students/Student.Entity';
import { Module } from 'entities/Courses/Module.Entity';
import { IStudentModule } from 'types/StudentDegree/StudentDegree.Interfaces';

@Entity('Student_Modules')
export class StudentModule implements IStudentModule {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Student, (student) => student.modules)
    @JoinColumn({ name: 'student_id' })
    student: Student;

    @ManyToOne(() => Module, (module) => module.studentModules)
    @JoinColumn({ name: 'module_id' })
    module: Module;
}
