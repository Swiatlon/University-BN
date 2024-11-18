import { Role } from 'entities/accounts/Role.Entity';
import { IAddress, IConsent, IExtendedPersonSchema } from 'types/persons/persons/Persons.Interfaces';

export interface IAccountCredentials {
    identifier: string;
    password: string;
}

export interface IRoles {
    id: number;
    name: string;
}

export interface IUserAccount {
    id: number;
    login: string;
    email: string;
    password: string;
    isActive: boolean;
    deactivationDate?: Date;
    roles: Role[];
}

export interface IUserAllData extends IExtendedPersonSchema {
    id: number;
    address: IAddress;
    consents: IConsent;
}

export interface IUserAccountRole {
    userAccountId: number;
    userAccountRoles: string;
}
