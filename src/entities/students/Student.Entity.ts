import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExtendedPerson } from '../schemas/ExtendedPerson.Schema';
import { StudentAddress } from './StudentAddress.Entity';
import { StudentConsent } from './StudentConsent.Entity';
import { StudentDegreeCourse } from 'entities/studentDegrees/StudentDegreeCourse.Entity';
import { StudentDegreePath } from 'entities/studentDegrees/StudentDegreePath.Entity';
import { StudentModule } from 'entities/studentDegrees/StudentModule.Entity';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { IStudent } from 'types/persons/students/Students.Interfaces';
import { Consent } from 'entities/schemas/Consent.Schema';
import { Address } from 'entities/schemas/Address.Schema';
import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';
import { StudentTodo } from './StudentTodos.Entity';

@Entity('Students')
export class Student extends ExtendedPerson implements IStudent {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => StudentConsent, { cascade: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'consent_id',
    })
    consent!: Consent;

    @OneToOne(() => StudentAddress, { cascade: true, nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'address_id' })
    address!: Address;

    @OneToOne(() => UserAccount, { cascade: true, nullable: true })
    @JoinColumn({
        name: 'account_id',
    })
    account!: UserAccount;

    @OneToMany(() => StudentDegreeCourse, (studentDegreeCourse) => studentDegreeCourse.student)
    @JoinColumn({ name: 'degree_course_id' })
    degreeCourses: StudentDegreeCourse[];

    @OneToMany(() => StudentDegreePath, (studentDegreePath) => studentDegreePath.student)
    @JoinColumn({ name: 'degree_path_id' })
    degreePaths: StudentDegreePath[];

    @OneToMany(() => StudentModule, (studentModule) => studentModule.student)
    @JoinColumn({ name: 'module_id' })
    modules: StudentModule[];

    @OneToMany(() => Grade, (grade) => grade.student, { cascade: true })
    studentsGrades: Grade[];

    @OneToMany(() => StudentTodo, (todo) => todo.student, { cascade: true })
    todos!: StudentTodo[];
}
