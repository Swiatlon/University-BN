import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ExtendedPerson } from '../Schemas/ExtendedPerson.Schema';
import { StudentAddress } from './StudentAddress.Entity';
import { StudentConsent } from './StudentConsent.Entity';
import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { StudentDegreePath } from 'entities/StudentDegrees/StudentDegreePath.Entity';
import { StudentModule } from 'entities/StudentDegrees/StudentModule.Entity';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { IStudent } from 'types/Persons/Students/Students.Interfaces';
import { Consent } from 'entities/Schemas/Consent.Schema';
import { Address } from 'entities/Schemas/Address.Schema';

@Entity('Students')
export class Student extends ExtendedPerson implements IStudent {
    @PrimaryGeneratedColumn()
    id!: string;

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
}
