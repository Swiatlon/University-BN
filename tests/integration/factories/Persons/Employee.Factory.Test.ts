import { Gender } from 'constants/entities/entities.Constants';
import { Employee } from 'entities/Employees/Employee.Entity';
import { EmployeeFactory } from 'factories/Persons/Employee.Factory';
import { PersonFactory } from 'factories/Persons/Person.Factory';

jest.mock('factories/Persons/Person.Factory');
jest.mock('factories/Persons/Consent.Factory');

describe('EmployeeFactory', () => {
    let mockedPersonFactory: jest.Mocked<PersonFactory>;
    let employeeFactory: EmployeeFactory;

    beforeEach(() => {
        mockedPersonFactory = new PersonFactory() as jest.Mocked<PersonFactory>;

        mockedPersonFactory.create.mockReturnValue({
            name: 'John',
            surname: 'Doe',
            dateOfBirth: new Date('1990-01-01'),
            pesel: '12345678901',
            gender: Gender.Men,
            nationality: 'USA',
            contactEmail: 'john.doe@example.com',
            contactPhone: '+1234567890',
            dateOfAdmission: '2022-01-01 12:00:00',
            id: '',
            accountId: '',
        });

        jest.spyOn(PersonFactory.prototype, 'create').mockImplementation(() => mockedPersonFactory.create());

        employeeFactory = new EmployeeFactory();
    });

    it('should create an Employee with valid data', () => {
        const addressId = 'address-123';
        const consentId = 'consent-123';

        const employee = employeeFactory.create(addressId, consentId);

        expect(employee).toBeInstanceOf(Employee);
        expect(employee.name).toBe('John');
        expect(employee.surname).toBe('Doe');
        expect(employee.dateOfBirth).toEqual(new Date('1990-01-01'));
        expect(employee.pesel).toBe('12345678901');
        expect(employee.gender).toBe('Men');
        expect(employee.nationality).toBe('USA');
        expect(employee.contactEmail).toBe('john.doe@example.com');
        expect(employee.contactPhone).toBe('+1234567890');
        expect(employee.dateOfAdmission).toBe('2022-01-01 12:00:00');
        expect(employee.address).toBe(addressId);
        expect(employee.consent).toBe(consentId);
    });
});
