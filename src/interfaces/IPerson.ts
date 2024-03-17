import { Gender } from '../constants/general/generalConstants';

export interface IPerson {
    id?: string;
    name: string;
    surname: string;
    pesel: string;
    gender: Gender;
    dateOfBirth: Date;
}
