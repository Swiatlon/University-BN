import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { IDegreeCourseFactory } from 'types/Factories/Factories.Interfaces';

export class DegreeCourseFactory implements IDegreeCourseFactory {
    create(name: string): DegreeCourse {
        const degreeCourse = new DegreeCourse();
        degreeCourse.name = name;

        return degreeCourse;
    }
}
