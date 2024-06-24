import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { DegreePath } from 'entities/Courses/DegreePath.Entity';

export class DegreePathFactory {
    create(name: string, degreeCourse: DegreeCourse): DegreePath {
        const degreePath = new DegreePath();
        degreePath.name = name;
        degreePath.degreeCourse = degreeCourse;

        return degreePath;
    }
}
