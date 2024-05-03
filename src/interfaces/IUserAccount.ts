import { IAddress } from './IAddress';
import { IConsent } from './IConsent';
import { IDtoPerson } from './IPerson';

export interface IUserAccount {
    id: string;
    login: string;
    email: string;
    password: string;
    isActive: boolean;
    deactivationDate: Date;
}

export interface IUserAllData extends IDtoPerson, IAddress, IConsent {
    id: string;
    addressId: string;
    consentId: string;
}
