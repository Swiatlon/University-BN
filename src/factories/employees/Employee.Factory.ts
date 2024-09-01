import { IEmployeeFactory } from 'types/Factories/Factory.Interfaces';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';
import { Address } from 'entities/Schemas/Address.Schema';
import { Consent } from 'entities/Schemas/Consent.Schema';
import { Employee } from 'entities/Employees/Employee.Entity';
import { ExtendedPerson } from 'entities/Schemas/ExtendedPerson.Schema';
import { UserAccountFactory } from 'factories/Accounts/UserAccountFactory';
import { AddressFactory } from 'factories/Persons/Address.Factory';
import { ConsentFactory } from 'factories/Persons/Consent.Factory';
import { ExtendedPersonFactory } from 'factories/Persons/ExtendedPerson.Factory';
import { RolesEnum } from 'constants/entities/entities.Constants';

export class EmployeeFactory implements IEmployeeFactory {
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

    create(person: ExtendedPerson, address: Address, consent: Consent, account: IUserAccount): Employee {
        const employee = new Employee();
        Object.assign(employee, person);

        employee.address = address;
        employee.consent = consent;
        employee.account = account;

        return employee;
    }

    async createWithFakeData(): Promise<Employee> {
        const employee = new Employee();
        const person = this.extendedPersonFactory.createWithFakeData();
        Object.assign(employee, person);

        employee.address = this.addressFactory.createWithFakeData();
        employee.consent = this.consentFactory.createWithFakeData();
        employee.account = await this.accountFactory.create(RolesEnum.EMPLOYEE, person);

        return employee;
    }
}
