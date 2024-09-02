import { DegreeCourse } from 'entities/courses/DegreeCourse.Entity';
import { DegreePath } from 'entities/courses/DegreePath.Entity';
import { IDegreePathFactory } from 'types/factories/Factory.Interfaces';

export class DegreePathFactory implements IDegreePathFactory {
    create(name: string, degreeCourse: DegreeCourse): DegreePath {
        const degreePath = new DegreePath();
        degreePath.name = name;
        degreePath.degreeCourse = degreeCourse;

        return degreePath;
    }
}
