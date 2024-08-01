import { Gender } from 'constants/entities/entities.Constants';
import { Module } from 'entities/Courses/Module.Entity';
import { StudentModule } from 'entities/StudentDegrees/StudentModule.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { StudentFactory } from 'factories/Persons/Student.Factory';
import { ModuleFactory } from 'factories/Courses/Module.Factory';
import { StudentModuleFactory } from 'factories/StudentDegrees/StudentModuleFactory';
import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { DegreePathFactory } from 'factories/Courses/DegreePath.Factory';
import { DegreeCourseFactory } from 'factories/Courses/DegreeCourse.Factory';

jest.mock('factories/Persons/Student.Factory');
jest.mock('factories/Courses/Module.Factory');
jest.mock('factories/Courses/DegreePath.Factory');
jest.mock('factories/Courses/DegreeCourse.Factory');

describe('StudentModuleFactory', () => {
    let mockedStudentFactory: jest.Mocked<StudentFactory>;
    let mockedModuleFactory: jest.Mocked<ModuleFactory>;
    let mockedDegreePathFactory: jest.Mocked<DegreePathFactory>;
    let mockedDegreeCourseFactory: jest.Mocked<DegreeCourseFactory>;
    let studentModuleFactory: StudentModuleFactory;

    beforeEach(() => {
        mockedStudentFactory = new StudentFactory() as jest.Mocked<StudentFactory>;
        mockedModuleFactory = new ModuleFactory() as jest.Mocked<ModuleFactory>;
        mockedDegreePathFactory = new DegreePathFactory() as jest.Mocked<DegreePathFactory>;
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

        mockedDegreePathFactory.create.mockImplementation(
            (name: string, degreeCourse: DegreeCourse) =>
                ({
                    name,
                    degreeCourse,
                    id: 'path-123',
                }) as DegreePath
        );

        mockedModuleFactory.create.mockImplementation(
            (name: string, degreePath: DegreePath) =>
                ({
                    name,
                    degreePath,
                    id: 'module-123',
                }) as Module
        );

        studentModuleFactory = new StudentModuleFactory();
    });

    it('should create a StudentModule with valid data', () => {
        const addressId = 'address-456';
        const consentId = 'consent-456';
        const moduleName = 'Programming 101';
        const degreeCourseName = 'Computer Science';
        const degreePathName = 'Software Engineering';

        const student = mockedStudentFactory.create(addressId, consentId);
        const degreeCourse = mockedDegreeCourseFactory.create(degreeCourseName);
        const degreePath = mockedDegreePathFactory.create(degreePathName, degreeCourse);
        const module = mockedModuleFactory.create(moduleName, degreePath);
        const studentModule = studentModuleFactory.create(student, module);

        expect(studentModule).toBeInstanceOf(StudentModule);
        expect(studentModule.student).toBe(student);
        expect(studentModule.module).toBe(module);

        // Verify student attributes
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

        // Verify module attributes
        expect(module.name).toBe(moduleName);
        expect(module.degreePath).toBe(degreePath);
        expect(module.id).toBe('module-123');

        // Verify degreePath attributes
        expect(degreePath.name).toBe(degreePathName);
        expect(degreePath.degreeCourse).toBe(degreeCourse);
        expect(degreePath.id).toBe('path-123');

        // Verify degreeCourse attributes
        expect(degreeCourse.name).toBe(degreeCourseName);
        expect(degreeCourse.id).toBe('course-123');
    });
});
