import { Employee } from 'entities/Employees/Employee.Entity';
import { IEmployeeFactory } from 'interfaces/Factories/IFactories';
import { ConsentFactory } from './Consent.Factory';
import { PersonFactory } from './Person.Factory';

export class EmployeeFactory implements IEmployeeFactory {
    private personFactory: PersonFactory;
    private consentFactory: ConsentFactory;

    constructor() {
        this.personFactory = new PersonFactory();
        this.consentFactory = new ConsentFactory();
    }

    create(addressId: string, consentId: string): Employee {
        const employee = new Employee();
        Object.assign(employee, this.personFactory.create(), this.consentFactory.create());

        employee.address = addressId;
        employee.consent = consentId;

        return employee;
    }
}
