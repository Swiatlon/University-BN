import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { IDegreeCourseFactory } from 'interfaces/Factories/IFactories';

export class DegreeCourseFactory implements IDegreeCourseFactory {
    create(name: string): DegreeCourse {
        const degreeCourse = new DegreeCourse();
        degreeCourse.name = name;

        return degreeCourse;
    }
}
