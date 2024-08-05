import { Gender } from 'constants/entities/entities.Constants';
import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { StudentDegreePath } from 'entities/StudentDegrees/StudentDegreePath.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { StudentDegreePathFactory } from 'factories/StudentDegrees/StudentDegreePath.Factory';
import { StudentFactory } from 'factories/Persons/Student.Factory';
import { DegreeCourseFactory } from 'factories/Courses/DegreeCourse.Factory';
import { DegreePathFactory } from 'factories/Courses/DegreePath.Factory';

jest.mock('factories/Persons/Student.Factory');
jest.mock('factories/Courses/DegreeCourse.Factory');
jest.mock('factories/Courses/DegreePath.Factory');

describe('StudentDegreePathFactory', () => {
    let mockedStudentFactory: jest.Mocked<StudentFactory>;
    let mockedDegreeCourseFactory: jest.Mocked<DegreeCourseFactory>;
    let mockedDegreePathFactory: jest.Mocked<DegreePathFactory>;
    let studentDegreePathFactory: StudentDegreePathFactory;

    beforeEach(() => {
        mockedStudentFactory = new StudentFactory() as jest.Mocked<StudentFactory>;
        mockedDegreeCourseFactory = new DegreeCourseFactory() as jest.Mocked<DegreeCourseFactory>;
        mockedDegreePathFactory = new DegreePathFactory() as jest.Mocked<DegreePathFactory>;

        mockedStudentFactory.create.mockImplementation(
            (addressId: string, consentId: string) =>
                ({
                    name: 'Jane',
                    surname: 'Doe',
                    dateOfBirth: new Date('2000-05-15'),
                    pesel: '09876543210',
                    gender: Gender.Women,
                    nationality: 'Canada',
                    contactEmail: 'jane.doe@example.com',
                    contactPhone: '+0987654321',
                    dateOfAdmission: '2023-09-01 09:00:00',
                    address: addressId,
                    consent: consentId,
                    id: '',
                    accountId: '',
                }) as Student
        );

        mockedDegreeCourseFactory.create.mockImplementation(
            (name: string) =>
                ({
                    name,
                    id: 'course-123',
                }) as DegreeCourse
        );

        mockedDegreePathFactory.create.mockImplementation(
            (name: string, degreeCourse: DegreeCourse) =>
                ({
                    name,
                    degreeCourse,
                    id: 'path-123',
                }) as DegreePath
        );

        studentDegreePathFactory = new StudentDegreePathFactory();
    });

    it('should create a StudentDegreePath with valid data', () => {
        const addressId = 'address-456';
        const consentId = 'consent-456';
        const degreeCourseName = 'Computer Science';
        const degreePathName = 'Software Engineering';

        const student = mockedStudentFactory.create(addressId, consentId);
        const degreeCourse = mockedDegreeCourseFactory.create(degreeCourseName);
        const degreePath = mockedDegreePathFactory.create(degreePathName, degreeCourse);
        const studentDegreePath = studentDegreePathFactory.create(student, degreePath, degreeCourse);

        expect(studentDegreePath).toBeInstanceOf(StudentDegreePath);
        expect(studentDegreePath.student).toBe(student);
        expect(studentDegreePath.degreePath).toBe(degreePath);
        expect(studentDegreePath.degreeCourse).toBe(degreeCourse);

        expect(student.name).toBe('Jane');
        expect(student.surname).toBe('Doe');
        expect(student.dateOfBirth).toEqual(new Date('2000-05-15'));
        expect(student.pesel).toBe('09876543210');
        expect(student.gender).toBe(Gender.Women);
        expect(student.nationality).toBe('Canada');
        expect(student.contactEmail).toBe('jane.doe@example.com');
        expect(student.contactPhone).toBe('+0987654321');
        expect(student.dateOfAdmission).toBe('2023-09-01 09:00:00');
        expect(student.address).toBe(addressId);
        expect(student.consent).toBe(consentId);

        expect(degreeCourse.name).toBe(degreeCourseName);
        expect(degreeCourse.id).toBe('course-123');

        expect(degreePath.name).toBe(degreePathName);
        expect(degreePath.degreeCourse).toBe(degreeCourse);
        expect(degreePath.id).toBe('path-123');
    });
});
