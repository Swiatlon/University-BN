import { Faker, faker } from '@faker-js/faker';
import { Person } from 'entities/Schemas/Person.Schema';
import { Validation } from 'constants/validators/validators.Constants';
import moment from 'moment';
import { Gender } from 'constants/entities/entities.Constants';
import { IPersonFactory } from 'types/Factories/Factories.Interfaces';

const amountOfElements = 3;
export class PersonFactory implements IPersonFactory {
    private faker: Faker = faker;

    private generatePhoneNumber(): string {
        const areaCode = this.faker.string.numeric(amountOfElements);
        const centralOfficeCode = this.faker.string.numeric(amountOfElements);
        const lineNumber = this.faker.string.numeric(amountOfElements);
        return `${areaCode}-${centralOfficeCode}-${lineNumber}`;
    }

    create(): Person {
        const person = new Person();
        person.name = this.faker.person.firstName();
        person.surname = this.faker.person.lastName();
        person.dateOfBirth = this.faker.date.birthdate({ mode: 'age' });
        person.pesel = this.faker.string.numeric(Validation.PESEL.LENGTH);
        person.gender = this.faker.helpers.arrayElement([Gender.Men, Gender.Women]);
        person.nationality = this.faker.location.country();
        person.contactEmail = this.faker.internet.email();
        person.contactPhone = this.generatePhoneNumber();
        person.dateOfAdmission = moment().format('YYYY-MM-DD HH:mm:ss');

        return person;
    }
}
