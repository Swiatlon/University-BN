import { Entity, OneToMany, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Subject } from './Subject.Entity';
import { CoursesBaseSchema } from 'entities/Schemas/Courses.Schema';
import { DegreePath } from './DegreePath.Entity';
import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { StudentDegreePath } from 'entities/StudentDegrees/StudentDegreePath.Entity';
import { IDegreeCourse } from 'types/Courses/Courses.Interfaces';

@Entity('Degree_Courses')
export class DegreeCourse extends CoursesBaseSchema implements IDegreeCourse {
    @OneToMany(() => DegreePath, (degreePath) => degreePath.degreeCourse)
    degreePaths: DegreePath[];

    @OneToMany(() => StudentDegreePath, (studentDegreePath) => studentDegreePath.degreeCourse)
    @JoinColumn({ name: 'student_path_id' })
    studentPaths: StudentDegreePath[];

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

    @OneToMany(() => StudentDegreeCourse, (studentDegreeCourse) => studentDegreeCourse.degreeCourse)
    @JoinColumn({ name: 'student_course_id' })
    studentCourses: StudentDegreeCourse[];
}
