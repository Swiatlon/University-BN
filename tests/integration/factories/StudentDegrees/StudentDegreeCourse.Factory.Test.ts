import { Gender } from 'constants/entities/entities.Constants';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { DegreeCourseFactory } from 'factories/Courses/DegreeCourse.Factory';
import { StudentFactory } from 'factories/Persons/Student.Factory';
import { StudentDegreeCourseFactory } from 'factories/StudentDegrees/StudentDegreeCourse.Factory';

jest.mock('factories/Persons/Student.Factory');
jest.mock('factories/Courses/DegreeCourse.Factory.ts');

describe('StudentDegreeCourseFactory', () => {
    let mockedStudentFactory: jest.Mocked<StudentFactory>;
    let mockedDegreeCourseFactory: jest.Mocked<DegreeCourseFactory>;
    let studentDegreeCourseFactory: StudentDegreeCourseFactory;

    beforeEach(() => {
        mockedStudentFactory = new StudentFactory() as jest.Mocked<StudentFactory>;
        mockedDegreeCourseFactory = new DegreeCourseFactory() as jest.Mocked<DegreeCourseFactory>;

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

        studentDegreeCourseFactory = new StudentDegreeCourseFactory();
    });

    it('should create a StudentDegreeCourse with valid data', () => {
        const addressId = 'address-456';
        const consentId = 'consent-456';
        const degreeCourseName = 'Computer Science';

        const student = mockedStudentFactory.create(addressId, consentId);
        const degreeCourse = mockedDegreeCourseFactory.create(degreeCourseName);
        const studentDegreeCourse = studentDegreeCourseFactory.create(student, degreeCourse);

        expect(studentDegreeCourse).toBeInstanceOf(StudentDegreeCourse);
        expect(studentDegreeCourse.student).toBe(student);
        expect(studentDegreeCourse.degreeCourse).toBe(degreeCourse);

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
    });
});
