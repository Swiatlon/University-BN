import { Role } from 'entities/Accounts/Role.Entity';
import { Employee } from 'entities/Employees/Employee.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { IUserAllData } from 'types/Accounts/Accounts.Interfaces';
import { ExtendedUserDataWithRoles } from './Services.Types';

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

export interface IUserInfoService {
    getUserInfo(userInfoData: IUserInfo): Promise<ExtendedUserDataWithRoles | null>;
}

export interface ILoginUniquesService {
    generateUniqueLoginAndEmailBasedOnName(name: string, surname: string): Promise<{ login: string; email: string }>;
}

export interface ICommunityService {
    getAllTeachers(): Promise<{ items: Employee[]; count?: number }>;
}
