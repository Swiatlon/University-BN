import { Role } from 'entities/Accounts/Role.Entity';
import { IAddress, IConsent, IDtoPerson, IPersonRelations } from 'interfaces/Persons/IPersons';

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

//TODO: Check in future
export interface IUserAllData extends IDtoPerson, IAddress, IConsent, IPersonRelations {
    id: string;
}

export interface IUserAccountRole {
    userAccountId: string;
    userAccountRoles: string;
}
