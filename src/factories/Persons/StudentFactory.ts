import { Student } from 'entities/Students/StudentEntity';
import { PersonFactory } from './PersonFactory';
import { ConsentFactory } from './ConsentFactory';

export class StudentFactory {
    create(addressId: string, consentId: string): Student {
        const student = new Student();
        Object.assign(student, new PersonFactory().create(), new ConsentFactory().create());

        student.addressId = addressId;
        student.consentId = consentId;

        return student;
    }
}
