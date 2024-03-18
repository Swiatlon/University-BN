import { Faker, faker } from '@faker-js/faker';
import { Gender } from 'constants/general/generalConstants';
import { Student } from 'entities/StudentEntity';
import { Validation } from 'constants/validators/validatorsConstants';

export class StudentFactory {
    private faker: Faker = faker;

    create(): Student {
        const student = new Student();
        student.name = this.faker.person.firstName();
        student.surname = this.faker.person.lastName();
        student.dateOfBirth = this.faker.date.birthdate({ mode: 'age' });
        student.pesel = this.faker.string.numeric(Validation.PESEL.LENGTH);
        student.gender = this.faker.helpers.arrayElement([Gender.Men, Gender.Women]);

        return student;
    }
}
