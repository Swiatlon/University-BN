import { Student } from 'entities/Students/Student.Entity';
import { IStudentFactory } from 'interfaces/Factories/IFactories';
import { ConsentFactory } from './Consent.Factory';
import { PersonFactory } from './Person.Factory';

export class StudentFactory implements IStudentFactory {
    private personFactory: PersonFactory;
    private consentFactory: ConsentFactory;

    constructor() {
        this.personFactory = new PersonFactory();
        this.consentFactory = new ConsentFactory();
    }

    create(addressId: string, consentId: string): Student {
        const student = new Student();
        Object.assign(student, this.personFactory.create(), this.consentFactory.create());

        student.address = addressId;
        student.consent = consentId;

        return student;
    }
}
