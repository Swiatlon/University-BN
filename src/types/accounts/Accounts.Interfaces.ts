import { Role } from 'entities/Accounts/Role.Entity';
import { IAddress, IConsent, IExtendedPersonSchema } from 'types/Persons/Persons/Persons.Interfaces';

export interface ICreateAccountDto {
    identifier: string;
    password: string;
}

export interface IRoles {
    id: string;
    name: string;
}

export interface IUserAccount {
    id: string;
    login: string;
    email: string;
    password: string;
    isActive: boolean;
    deactivationDate?: Date;
    roles: Role[];
}

export interface IUserAllData extends IExtendedPersonSchema {
    id: string;
    address: IAddress;
    consents: IConsent;
}

export interface IUserAccountRole {
    userAccountId: string;
    userAccountRoles: string;
}
