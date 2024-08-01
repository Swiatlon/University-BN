import { Gender } from 'constants/entities/entities.Constants';
import { Student } from 'entities/Students/Student.Entity';

import { StudentFactory } from 'factories/Persons/Student.Factory';
import { PersonFactory } from 'factories/Persons/Person.Factory';

jest.mock('factories/Persons/Person.Factory');
jest.mock('factories/Persons/Consent.Factory');

describe('StudentFactory', () => {
    let mockedPersonFactory: jest.Mocked<PersonFactory>;
    let studentFactory: StudentFactory;

    beforeEach(() => {
        mockedPersonFactory = new PersonFactory() as jest.Mocked<PersonFactory>;

        mockedPersonFactory.create.mockReturnValue({
            name: 'Jane',
            surname: 'Doe',
            dateOfBirth: new Date('2000-05-15'),
            pesel: '09876543210',
            gender: Gender.Women,
            nationality: 'Canada',
            contactEmail: 'jane.doe@example.com',
            contactPhone: '+0987654321',
            dateOfAdmission: '2023-09-01 09:00:00',
            id: '',
            accountId: '',
        });

        jest.spyOn(PersonFactory.prototype, 'create').mockImplementation(() => mockedPersonFactory.create());

        studentFactory = new StudentFactory();
    });

    it('should create a Student with valid data', () => {
        const addressId = 'address-456';
        const consentId = 'consent-456';

        const student = studentFactory.create(addressId, consentId);

        expect(student).toBeInstanceOf(Student);
        expect(student.name).toBe('Jane');
        expect(student.surname).toBe('Doe');
        expect(student.dateOfBirth).toEqual(new Date('2000-05-15'));
        expect(student.pesel).toBe('09876543210');
        expect(student.gender).toBe('Women');
        expect(student.nationality).toBe('Canada');
        expect(student.contactEmail).toBe('jane.doe@example.com');
        expect(student.contactPhone).toBe('+0987654321');
        expect(student.dateOfAdmission).toBe('2023-09-01 09:00:00');
        expect(student.address).toBe(addressId);
        expect(student.consent).toBe(consentId);
    });
});
