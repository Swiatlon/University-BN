import { Faker, faker } from '@faker-js/faker';
import { BasicPerson } from 'entities/schemas/BasicPerson.Schema';
import { IBasicPersonFactory } from 'types/factories/Factory.Interfaces';
import { IBasicPersonSchema } from 'types/persons/persons/Persons.Interfaces';
import { GenderEnum } from 'constants/entities/entities.Constants';
import { generatePhoneNumber } from 'utils/factories/Factory.Utils';

export class BasicPersonFactory implements IBasicPersonFactory {
    private faker: Faker = faker;

    create(person: IBasicPersonSchema): BasicPerson {
        const newPerson = new BasicPerson();

        newPerson.name = person.name;
        newPerson.surname = person.surname;
        newPerson.gender = person.gender;
        newPerson.nationality = person.nationality;
        newPerson.contactEmail = person.contactEmail;
        newPerson.contactPhone = person.contactPhone;

        return newPerson;
    }

    createWithFakeData(): BasicPerson {
        const newPerson = new BasicPerson();

        newPerson.name = this.faker.person.firstName();
        newPerson.surname = this.faker.person.lastName();
        newPerson.gender = this.faker.helpers.arrayElement([GenderEnum.MALE, GenderEnum.FEMALE]);
        newPerson.nationality = this.faker.location.country();
        newPerson.contactEmail = this.faker.internet.email();
        newPerson.contactPhone = generatePhoneNumber();

        return newPerson;
    }
}
