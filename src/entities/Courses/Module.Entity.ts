import { Entity, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Subject } from './Subject.Entity';
import { CoursesBaseSchema } from 'entities/Schemas/Courses.Schema';
import { IModule } from 'interfaces/Courses/ICourses';
import { DegreePath } from './DegreePath.Entity';

@Entity('Modules')
export class Module extends CoursesBaseSchema implements IModule {
    @ManyToOne(() => DegreePath, (degreePath) => degreePath.modules)
    @JoinColumn({ name: 'degree_path_id' })
    degreePath: DegreePath;

    @ManyToMany(() => Subject, (subject) => subject.modules)
    @JoinTable({
        name: 'Modules_Subjects',
        joinColumn: { name: 'module_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'subject_id', referencedColumnName: 'id' },
    })
    subjects: Subject[];
}
