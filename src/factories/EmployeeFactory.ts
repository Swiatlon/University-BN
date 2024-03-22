import { PersonFactory } from './PersonFactory';
import { Employee } from 'entities/EmployeeEntity';

export class EmployeeFactory {
    create(addressId: string): Employee {
        const employee = new Employee();
        Object.assign(employee, new PersonFactory().create());

        employee.addressId = addressId;

        return employee;
    }
}
