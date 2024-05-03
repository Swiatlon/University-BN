import { Gender } from 'constants/general/generalConstants';

export interface IPerson extends IDtoPerson {
    accountId: string;
}

export interface IDtoPerson {
    id?: string;
    name: string;
    surname: string;
    pesel: string;
    gender: Gender;
    dateOfBirth: Date;
    nationality: string;
}
