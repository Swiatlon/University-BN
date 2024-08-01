import { DegreeCourseFactory } from 'factories/Courses/DegreeCourse.Factory';

describe('DegreeCourse Factory', () => {
    it('should create an Degree Course with passed name', () => {
        const degreeCourseFactory = new DegreeCourseFactory();
        const degreeCourse = degreeCourseFactory.create('IT');

        expect(degreeCourse.name).toBe('IT');
    });
});
