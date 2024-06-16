import { ConsentFactory } from './ConsentFactory';
import { PersonFactory } from './PersonFactory';
import { Employee } from 'entities/Employees/EmployeeEntity';

export class EmployeeFactory {
    create(addressId: string, consentId: string): Employee {
        const employee = new Employee();
        Object.assign(employee, new PersonFactory().create(), new ConsentFactory().create());

        employee.addressId = addressId;
        employee.consentId = consentId;

        return employee;
    }
}
