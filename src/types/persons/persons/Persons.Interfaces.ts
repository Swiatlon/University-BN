import { GenderEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { Address } from 'entities/schemas/Address.Schema';
import { Consent } from 'entities/schemas/Consent.Schema';

export interface IBasicPersonSchema {
    name: string;
    surname: string;
    gender: GenderEnum;
    nationality?: string;
    contactEmail?: string;
    contactPhone?: string;
}

export interface IExtendedPersonSchema extends Omit<IBasicPersonSchema, 'nationality' | 'contactEmail' | 'contactPhone'> {
    dateOfBirth: Date;
    pesel: string;
    nationality: string;
    contactEmail: string;
    contactPhone: string;
    dateOfAdmission: string;
}

export interface IConsent {
    id: number;
    permissionForPhoto: boolean;
    permissionForDataProcessing: boolean;
}

export interface IAddress {
    id: number;
    country: string;
    city: string;
    postalCode: string;
    street: string;
    buildingNumber: string;
    apartmentNumber: string;
}

export interface IPersonRelations {
    consent: Consent;
    address: Address;
    account: UserAccount;
}
