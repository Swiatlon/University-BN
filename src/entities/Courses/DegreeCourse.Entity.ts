import { Entity, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Subject } from './Subject.Entity';
import { IDegreeCourse } from 'interfaces/Courses/ICourses';
import { CoursesBaseSchema } from 'entities/Schemas/Courses.Schema';
import { DegreePath } from './DegreePath.Entity';

@Entity('Degree_Courses')
export class DegreeCourse extends CoursesBaseSchema implements IDegreeCourse {
    @OneToMany(() => DegreePath, (degreePath) => degreePath.degreeCourse)
    degreePaths: DegreePath[];

    @ManyToMany(() => Subject, (subject) => subject.degreeCourses, { onDelete: 'CASCADE' })
    @JoinTable({
        name: 'Degree_Courses_Subjects',
        joinColumn: {
            name: 'degree_course_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'subject_id',
            referencedColumnName: 'id',
        },
    })
    subjects: Subject[];
}
