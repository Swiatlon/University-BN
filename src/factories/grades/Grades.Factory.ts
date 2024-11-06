import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';
import { Student } from 'entities/students/Student.Entity';
import { Subject } from 'entities/courses/Subject.Entity';
import { gradeValueEnumArray, passDateAttemptEnumArray } from 'constants/entities/entities.Constants';
import { IGradeFactory } from 'types/factories/Factory.Interfaces';
import { faker } from '@faker-js/faker';

export class GradeFactory implements IGradeFactory {
    create(student: Student, subject: Subject): Grade {
        const grade = new Grade();
        grade.student = student;
        grade.subject = subject;
        grade.grade = faker.helpers.arrayElement(gradeValueEnumArray);
        grade.passDateAttempt = faker.helpers.arrayElement(passDateAttemptEnumArray);

        return grade;
    }

    createWithFakeData(): Grade {
        const grade = new Grade();

        grade.grade = faker.helpers.arrayElement(gradeValueEnumArray);
        grade.passDateAttempt = faker.helpers.arrayElement(passDateAttemptEnumArray);

        return grade;
    }
}
