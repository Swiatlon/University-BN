import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { Validation } from 'constants/validators/validators.Constants';
import { ICoursesBaseSchema } from 'interfaces/Courses/ICourses';
export abstract class CoursesBaseSchema implements ICoursesBaseSchema {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({
        nullable: false,
        length: Validation.COURSES_NAME.MAX_LENGTH,
        unique: true,
    })
    name: string;
}
