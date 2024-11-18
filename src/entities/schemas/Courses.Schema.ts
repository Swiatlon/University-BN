import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Validation } from 'constants/validators/validators.Constants';
import { ICoursesBaseSchema } from 'types/courses/Courses.Interfaces';

export abstract class CoursesBaseSchema implements ICoursesBaseSchema {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: false,
        length: Validation.COURSES_NAME.MAX_LENGTH,
        unique: true,
    })
    name: string;
}
