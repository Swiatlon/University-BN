import { Student } from 'entities/Students/Student.Entity';
import { ExtendedPersonFactory } from 'factories/Persons/ExtendedPerson.Factory';
import { IStudentFactory } from 'types/Factories/Factory.Interfaces';
import { Address } from 'entities/Schemas/Address.Schema';
import { Consent } from 'entities/Schemas/Consent.Schema';
import { ExtendedPerson } from 'entities/Schemas/ExtendedPerson.Schema';
import { AddressFactory } from 'factories/Persons/Address.Factory';
import { ConsentFactory } from 'factories/Persons/Consent.Factory';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';
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
