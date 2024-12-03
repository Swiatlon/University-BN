import { Student } from 'entities/students/Student.Entity';
import { IUserAllData } from 'types/accounts/Accounts.Interfaces';
import { ExtendedLoggedAccountData } from './Services.Types';
import { Event } from 'entities/events/Event.Entity';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { ILoginCredentials, IRefreshCredentials } from 'types/controllers/Controllers.Interfaces';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { Grade } from 'entities/studentsGrades/StudentGrades.Entity';

export interface ILoggedAccountData {
    accountId: number;
    roles: RolesEnum[];
}

export interface IPersonalDataService {
    getUserAllData(userInfoData: ILoggedAccountData): Promise<IUserAllData | null>;
}

export interface IStudentService {
    createStudent(studentData: Partial<Student>): Promise<Student>;
}

export interface IGradesService {
    getGradesByStudentId(studentId: number): Promise<Grade[]>;
}

export interface ILoggedAccountService {
    getLoggedAccountData(userInfoData: ILoggedAccountData): Promise<ExtendedLoggedAccountData | null>;
}

export interface ILoginUniquesService {
    generateUniqueLoginAndEmailBasedOnName(name: string, surname: string): Promise<{ login: string; email: string }>;
}

export interface ICommunityService {
    getEvents(): Promise<Event[]>;
    getEventById(eventId: number): Promise<Event | null>;
    getAllEventOrganizers(): Promise<EventOrganizer[]>;
}

export interface IAuthService {
    login(credentials: ILoginCredentials): Promise<{
        accessToken: string;
        refreshToken: string;
        userData: {
            accountId: number;
            roles: string[];
        };
        sessionData: {
            rememberMe: boolean;
        };
    }>;

    refreshSession(credentials: IRefreshCredentials): Promise<{
        accessToken: string;
    }>;
}
