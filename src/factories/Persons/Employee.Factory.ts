import { ConsentFactory } from './Consent.Factory';
import { PersonFactory } from './Person.Factory';
import { Employee } from 'entities/Employees/Employee.Entity';

export class EmployeeFactory {
    create(addressId: string, consentId: string): Employee {
        const employee = new Employee();
        Object.assign(employee, new PersonFactory().create(), new ConsentFactory().create());

        employee.addressId = addressId;
        employee.consentId = consentId;

        return employee;
    }
}
