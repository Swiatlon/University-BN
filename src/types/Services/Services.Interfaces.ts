import { Student } from 'entities/Students/Student.Entity';
import { IUserAllData } from 'types/Accounts/Accounts.Interfaces';
import { ExtendedUserDataWithRoles } from './Services.Types';
import { Event } from 'entities/Events/Event.Entity';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { ILoginCredentials } from 'types/Controllers/Controllers.Interfaces';
import { EventOrganizer } from 'entities/Events/EventOrganizer.Entity';

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
