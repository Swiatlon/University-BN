import { Entity, ManyToOne, ManyToMany, JoinTable, JoinColumn, OneToMany } from 'typeorm';
import { Subject } from './Subject.Entity';
import { CoursesBaseSchema } from 'entities/schemas/Courses.Schema';
import { DegreePath } from './DegreePath.Entity';
import { StudentModule } from 'entities/studentDegrees/StudentModule.Entity';
import { IModule } from 'types/courses/Courses.Interfaces';

@Entity('Modules')
export class Module extends CoursesBaseSchema implements IModule {
    @ManyToOne(() => DegreePath, (degreePath) => degreePath.modules)
    @JoinColumn({ name: 'degree_path_id' })
    degreePath: DegreePath;

    @OneToMany(() => StudentModule, (studentModule) => studentModule.module)
    @JoinColumn({ name: 'student_module_id' })
    studentModules: StudentModule[];

    @ManyToMany(() => Subject, (subject) => subject.modules)
    @JoinTable({
        name: 'Modules_Subjects',
        joinColumn: { name: 'module_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'subject_id', referencedColumnName: 'id' },
    })
    subjects: Subject[];
}
