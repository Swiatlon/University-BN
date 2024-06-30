import { Role } from 'entities/Accounts/Role.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { IUserAllData } from 'interfaces/Accounts/IAccounts';
import { IEmployeeWithRoles } from 'interfaces/Persons/IEmployees';
import { IStudentWithRoles } from 'interfaces/Persons/IStudents';

export interface IUserInfo {
    id: string;
    roles: Role[];
    queryRole: string;
    mainRole: string;
}

export interface IPersonalDataService {
    getUserAllData(userInfoData: IUserInfo): Promise<IUserAllData | null>;
}

export interface IStudentService {
    createStudent(studentData: Partial<Student>): Promise<Student>;
}

export type ExtendedUserDataWithRoles = IStudentWithRoles | IEmployeeWithRoles | { roles: Role[] };

export interface IUserInfoService {
    getUserInfo(userInfoData: IUserInfo): Promise<ExtendedUserDataWithRoles | null>;
}
