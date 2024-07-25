import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Person } from '../Schemas/Person.Schema';
import { StudentAddress } from './StudentAddress.Entity';
import { StudentConsent } from './StudentConsent.Entity';
import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { StudentDegreePath } from 'entities/StudentDegrees/StudentDegreePath.Entity';
import { StudentModule } from 'entities/StudentDegrees/StudentModule.Entity';
import { IStudentRelations } from 'types/Persons/Students/Students.Interfaces';

@Entity('Students')
export class Student extends Person implements IStudentRelations {
    @OneToOne(() => StudentConsent, { cascade: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({
        name: 'consent_id',
    })
    consent: string;

    @OneToOne(() => StudentAddress, { cascade: true, nullable: false, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'address_id' })
    address!: string;

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
