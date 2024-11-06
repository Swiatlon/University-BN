import { Student } from 'entities/students/Student.Entity';
import { IUserAllData } from 'types/accounts/Accounts.Interfaces';
import { ExtendedUserDataWithRoles } from './Services.Types';
import { Event } from 'entities/events/Event.Entity';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { ILoginCredentials } from 'types/controllers/Controllers.Interfaces';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';

export interface IUserInfo {
    accountId: string;
    roles: RolesEnum[];
}

export interface IPersonalDataService {
    getUserAllData(userInfoData: IUserInfo): Promise<IUserAllData | null>;
}

export interface IStudentService {
    createStudent(studentData: Partial<Student>): Promise<Student>;
}

export interface IGradesService {
    getGradesByStudentId(studentId: string): Promise<Grade[]>;
}

export interface IUserInfoService {
    getUserInfo(userInfoData: IUserInfo): Promise<ExtendedUserDataWithRoles | null>;
}

export interface ILoginUniquesService {
    generateUniqueLoginAndEmailBasedOnName(name: string, surname: string): Promise<{ login: string; email: string }>;
}

export interface ICommunityService {
    getEvents(): Promise<Event[]>;
    getEventById(eventId: string): Promise<Event | null>;
    getAllEventOrganizers(): Promise<EventOrganizer[]>;
}

export interface IAuthService {
    login(credentials: ILoginCredentials): Promise<{
        accessToken: string;
        refreshToken: string;
        userData: {
            accountId: string;
            roles: string[];
        };
        sessionData: {
            sessionID: string;
            rememberMe: boolean;
        };
    }>;

    refresh(
        refreshToken: string,
        sessionID: string,
        loginSavedSessionID: string,
        rememberMe: boolean
    ): Promise<{
        accessToken: string;
    }>;
}
