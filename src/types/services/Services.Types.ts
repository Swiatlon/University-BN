import { RolesEnum } from 'constants/entities/entities.Constants';
import { IEmployeeWithRoles } from 'types/Persons/Employee/Employees.Interfaces';
import { IStudentWithRoles } from 'types/Persons/Students/Students.Interfaces';

export type ExtendedUserDataWithRoles = IStudentWithRoles | IEmployeeWithRoles | { roles: RolesEnum[] };
