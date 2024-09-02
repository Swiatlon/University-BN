import { RolesEnum } from 'constants/entities/entities.Constants';
import { IEmployeeWithRoles } from 'types/persons/employee/Employees.Interfaces';
import { IStudentWithRoles } from 'types/persons/students/Students.Interfaces';

export type ExtendedUserDataWithRoles = IStudentWithRoles | IEmployeeWithRoles | { roles: RolesEnum[] };
