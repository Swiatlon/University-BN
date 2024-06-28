import { Gender } from 'constants/general/general.Constants';
import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { StudentDegreePath } from 'entities/StudentDegrees/StudentDegreePath.Entity';
import { StudentModule } from 'entities/StudentDegrees/StudentModule.Entity';

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
    consentId: string;
    addressId: string;
}

export interface IEmployeeRelations extends IPersonRelations {}

export interface IStudentRelations extends IPersonRelations {
    degreeCourses: StudentDegreeCourse[];
    degreePaths: StudentDegreePath[];
    modules: StudentModule[];
}
