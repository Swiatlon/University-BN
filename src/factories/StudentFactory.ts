import { Student } from 'entities/StudentEntity';
import { PersonFactory } from './PersonFactory';

export class StudentFactory {
    create(addressId: string): Student {
        const student = new Student();
        Object.assign(student, new PersonFactory().create());

        student.addressId = addressId;

        return student;
    }
}
