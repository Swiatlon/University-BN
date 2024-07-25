import { Gender } from 'constants/entities/entities.Constants';

export interface IDtoPerson {
    id?: string;
    name: string;
    surname: string;
    pesel: string;
    gender: Gender;
    dateOfBirth: Date;
    nationality: string;
}

export interface IPerson extends IDtoPerson {
    accountId: string;
}

export interface IConsent {
    id: string;
    permissionForPhoto: boolean;
    permissionForDataProcessing: boolean;
}

export interface IAddress {
    id: string;
    country: string;
    city: string;
    postalCode: string;
    street: string;
    buildingNumber: string;
    apartmentNumber: string;
}

export interface IPersonRelations {
    consent: string;
    address: string;
}
