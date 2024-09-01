import { AppDataSource } from '../../configs/database';
import { DataSource } from 'typeorm';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';

export const DegreeCoursesRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(DegreeCourse).extend({
        async getAllDegreeCourses() {
            const degreeCourses = await this.find({
                select: {
                    id: true,
                    name: true,
                },
            });

            return degreeCourses;
        },
    });
};
