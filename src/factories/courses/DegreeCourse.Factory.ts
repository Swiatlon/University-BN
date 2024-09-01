import { Faker, faker } from '@faker-js/faker';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { IDegreeCourseFactory } from 'types/Factories/Factory.Interfaces';

export class DegreeCourseFactory implements IDegreeCourseFactory {
    private faker: Faker = faker;

    create(name: string): DegreeCourse {
        const degreeCourse = new DegreeCourse();
        degreeCourse.name = name;

        return degreeCourse;
    }
}
