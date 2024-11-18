import { RolesEnum } from 'constants/entities/entities.Constants';
import { IEmployeeWithRoles } from 'types/persons/employee/Employees.Interfaces';
import { IStudentWithRoles } from 'types/persons/students/Students.Interfaces';

interface IExtendedData {
    roles: RolesEnum[];
    accountId: number;
}

export type ExtendedLoggedAccountData = IStudentWithRoles | IEmployeeWithRoles | IExtendedData;
