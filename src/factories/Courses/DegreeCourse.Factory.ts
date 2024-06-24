import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';

export class DegreeCourseFactory {
    create(name: string): DegreeCourse {
        const degreeCourse = new DegreeCourse();
        degreeCourse.name = name;

        return degreeCourse;
    }
}
