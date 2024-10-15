import { Student } from 'entities/students/Student.Entity';
import { ExtendedPersonFactory } from 'factories/persons/ExtendedPerson.Factory';
import { IStudentFactory } from 'types/factories/Factory.Interfaces';
import { Address } from 'entities/schemas/Address.Schema';
import { Consent } from 'entities/schemas/Consent.Schema';
import { ExtendedPerson } from 'entities/schemas/ExtendedPerson.Schema';
import { AddressFactory } from 'factories/persons/Address.Factory';
import { ConsentFactory } from 'factories/persons/Consent.Factory';
import { IUserAccount } from 'types/accounts/Accounts.Interfaces';
import { UserAccountFactory } from 'factories/accounts/UserAccountFactory';
import { RolesEnum } from 'constants/entities/entities.Constants';

export class StudentFactory implements IStudentFactory {
    private extendedPersonFactory: ExtendedPersonFactory;
    private addressFactory: AddressFactory;
    private consentFactory: ConsentFactory;
    private accountFactory: UserAccountFactory;

    constructor() {
        this.extendedPersonFactory = new ExtendedPersonFactory();
        this.addressFactory = new AddressFactory();
        this.consentFactory = new ConsentFactory();
        this.accountFactory = new UserAccountFactory();
    }

    create(person: ExtendedPerson, address: Address, consent: Consent, account: IUserAccount): Student {
        const student = new Student();
        Object.assign(student, person);

        student.address = address;
        student.consent = consent;
        student.account = account;

        return student;
    }

    async createWithFakeData(): Promise<Student> {
        const student = new Student();
        const person = this.extendedPersonFactory.createWithFakeData();
        Object.assign(student, person);

        student.address = this.addressFactory.createWithFakeData();
        student.consent = this.consentFactory.createWithFakeData();
        student.account = await this.accountFactory.create(RolesEnum.STUDENT, person);

        return student;
    }
}
