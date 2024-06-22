import { Student } from 'entities/Students/Student.Entity';
import { PersonFactory } from './Person.Factory';
import { ConsentFactory } from './Consent.Factory';

export class StudentFactory {
    create(addressId: string, consentId: string): Student {
        const student = new Student();
        Object.assign(student, new PersonFactory().create(), new ConsentFactory().create());

        student.addressId = addressId;
        student.consentId = consentId;

        return student;
    }
}
