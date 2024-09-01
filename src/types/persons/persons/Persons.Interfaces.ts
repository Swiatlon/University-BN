import { GenderEnum } from 'constants/entities/entities.Constants';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Address } from 'entities/Schemas/Address.Schema';
import { Consent } from 'entities/Schemas/Consent.Schema';

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
    consent: Consent;
    address: Address;
    account: UserAccount;
}
