import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { DegreePathFactory } from 'factories/Courses/DegreePath.Factory';

describe('DegreePath Factory', () => {
    it('should create a Degree Path with the passed name and degree course', () => {
        const degreeCourse = new DegreeCourse();
        degreeCourse.name = 'Computer Science';

        const degreePathFactory = new DegreePathFactory();
        const degreePath = degreePathFactory.create('Software Engineering', degreeCourse);

        expect(degreePath.name).toBe('Software Engineering');
        expect(degreePath.degreeCourse).toBe(degreeCourse);
    });
});
