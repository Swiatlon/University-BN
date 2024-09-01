import { Role } from 'entities/Accounts/Role.Entity';
import { Employee } from 'entities/Employees/Employee.Entity';
import { IPersonRelations } from '../Persons/Persons.Interfaces';

export interface IEmployee extends IPersonRelations {
    id: string;
}

export interface IEmployeeWithRoles extends Employee {
    roles: Role[];
}
