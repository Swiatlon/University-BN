import { Role } from 'entities/accounts/Role.Entity';
import { Employee } from 'entities/employees/Employee.Entity';
import { IPersonRelations } from '../persons/Persons.Interfaces';

export interface IEmployee extends IPersonRelations {
    id: string;
}

export interface IEmployeeWithRoles extends Employee {
    roles: Role[];
}
