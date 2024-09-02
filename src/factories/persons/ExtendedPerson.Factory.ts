import { Faker, faker } from '@faker-js/faker';
import { GenderEnum } from 'constants/entities/entities.Constants';
import { Validation } from 'constants/validators/validators.Constants';
import { ExtendedPerson } from 'entities/schemas/ExtendedPerson.Schema';
import { IExtendedPersonFactory } from 'types/factories/Factory.Interfaces';
import { IExtendedPersonSchema } from 'types/persons/persons/Persons.Interfaces';
import { generatePhoneNumber } from 'utils/factories/Factory.Utils';
import moment from 'moment';

export class ExtendedPersonFactory implements IExtendedPersonFactory {
    private faker: Faker = faker;

    create(person: IExtendedPersonSchema): ExtendedPerson {
        const newPerson = new ExtendedPerson();

        newPerson.name = person.name;
        newPerson.surname = person.surname;
        newPerson.gender = person.gender;
        newPerson.dateOfBirth = person.dateOfBirth;
        newPerson.pesel = person.pesel;
        newPerson.nationality = person.nationality;
        newPerson.contactEmail = person.contactEmail;
        newPerson.contactPhone = person.contactPhone;
        newPerson.dateOfAdmission = person.dateOfAdmission;

        return newPerson;
    }

    createWithFakeData(): ExtendedPerson {
        const newPerson = new ExtendedPerson();

        newPerson.name = this.faker.person.firstName();
        newPerson.surname = this.faker.person.lastName();
        newPerson.dateOfBirth = this.faker.date.birthdate({ mode: 'age' });
        newPerson.pesel = this.faker.string.numeric(Validation.PESEL.LENGTH);
        newPerson.gender = this.faker.helpers.arrayElement([GenderEnum.MALE, GenderEnum.FEMALE]);
        newPerson.nationality = this.faker.location.country();
        newPerson.contactEmail = this.faker.internet.email();
        newPerson.contactPhone = generatePhoneNumber();
        newPerson.dateOfAdmission = moment().format('YYYY-MM-DD HH:mm:ss');

        return newPerson;
    }
}
