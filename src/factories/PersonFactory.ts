import { Faker, faker } from '@faker-js/faker';
import { Gender } from 'constants/general/generalConstants';
import { Person } from 'entities/Schemas/PersonSchema';
import { Validation } from 'constants/validators/validatorsConstants';

export class PersonFactory {
    private faker: Faker = faker;

    create(): Person {
        const person = new Person();
        person.name = this.faker.person.firstName();
        person.surname = this.faker.person.lastName();
        person.dateOfBirth = this.faker.date.birthdate({ mode: 'age' });
        person.pesel = this.faker.string.numeric(Validation.PESEL.LENGTH);
        person.gender = this.faker.helpers.arrayElement([Gender.Men, Gender.Women]);
        person.nationality = faker.location.country();

        return person;
    }
}
