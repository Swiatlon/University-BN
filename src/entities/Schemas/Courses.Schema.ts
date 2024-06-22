import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Validation } from 'constants/validators/validatorsConstants';
import { ICoursesBaseSchema } from 'interfaces/Courses/ICourses';

export abstract class CoursesBaseSchema implements ICoursesBaseSchema {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({
        nullable: false,
        length: Validation.COURSES_NAME.MAX_LENGTH,
    })
    name: string;
}
