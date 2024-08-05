import { Validation } from 'constants/validators/validators.Constants';
import { Gender } from 'constants/entities/entities.Constants';
import { Person } from 'entities/Schemas/Person.Schema';
import moment from 'moment';
import { PersonFactory } from 'factories/Persons/Person.Factory';

describe('PersonFactory', () => {
    let personFactory: PersonFactory;

    beforeEach(() => {
        personFactory = new PersonFactory();
    });

    it('should create a person with valid properties', () => {
        const person = personFactory.create();
        expect(person).toBeInstanceOf(Person);

        expect(typeof person.name).toBe('string');
        expect(person.name.length).toBeGreaterThan(0);

        expect(typeof person.surname).toBe('string');
        expect(person.surname.length).toBeGreaterThan(0);

        expect(moment(person.dateOfBirth, moment.ISO_8601, true).isValid()).toBe(true);

        expect(typeof person.pesel).toBe('string');
        expect(person.pesel.length).toBe(Validation.PESEL.LENGTH);

        expect([Gender.Men, Gender.Women]).toContain(person.gender);

        expect(typeof person.nationality).toBe('string');
        expect(person.nationality.length).toBeGreaterThan(0);

        expect(typeof person.contactEmail).toBe('string');
        expect(person.contactEmail.length).toBeGreaterThan(0);
        expect(person.contactEmail).toMatch(/^\S+@\S+\.\S+$/);

        expect(typeof person.contactPhone).toBe('string');
        expect(person.contactPhone).toMatch(/^\d{3}-\d{3}-\d{3}$/);

        expect(moment(person.dateOfAdmission, 'YYYY-MM-DD HH:mm:ss', true).isValid()).toBe(true);
    });

    it('should generate a valid phone number', () => {
        const phoneNumber = personFactory['generatePhoneNumber']();

        expect(typeof phoneNumber).toBe('string');
        expect(phoneNumber).toMatch(/^\d{3}-\d{3}-\d{3}$/);
    });
});
