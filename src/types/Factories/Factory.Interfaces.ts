import { RolesEnum } from 'constants/entities/entities.Constants';
import { Role } from 'entities/Accounts/Role.Entity';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { Company } from 'entities/Companies/Company.Entity';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { Module } from 'entities/Courses/Module.Entity';
import { Subject } from 'entities/Courses/Subject.Entity';
import { Employee } from 'entities/Employees/Employee.Entity';
import { Event } from 'entities/Events/Event.Entity';
import { ExternalParticipant } from 'entities/ExternalParticipants/ExternalParticipant.Entity';
import { Address } from 'entities/Schemas/Address.Schema';
import { BasicPerson } from 'entities/Schemas/BasicPerson.Schema';
import { Consent } from 'entities/Schemas/Consent.Schema';
import { ExtendedPerson } from 'entities/Schemas/ExtendedPerson.Schema';
import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { StudentDegreePath } from 'entities/StudentDegrees/StudentDegreePath.Entity';
import { StudentModule } from 'entities/StudentDegrees/StudentModule.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { IUserAccount } from 'types/Accounts/Accounts.Interfaces';
import { ICompany } from 'types/Companies/Companies.Interfaces';
import { IEvent } from 'types/Events/Events.Interfaces';
import { IExternalParticipant } from 'types/Persons/ExternalParticipants/ExternalParticipants.Interfaces';
import { IAddress, IBasicPersonSchema, IConsent, IExtendedPersonSchema } from 'types/Persons/Persons/Persons.Interfaces';

export interface IDegreeCourseFactory {
    create(name: string): DegreeCourse;
}

export interface IDegreePathFactory {
    create(name: string, degreeCourse: DegreeCourse): DegreePath;
}

export interface IModuleFactory {
    create(name: string, degreePath: DegreePath): Module;
}

export interface ISubjectFactory {
    create(name: string, module?: Module): Subject;
}

export interface IStudentDegreeCourseFactory {
    create(student: Student, degreeCourse: DegreeCourse): StudentDegreeCourse;
}

export interface IStudentDegreePathFactory {
    create(student: Student, degreePath: DegreePath, degreeCourse: DegreeCourse): StudentDegreePath;
}

export interface IStudentModuleFactory {
    create(student: Student, module: Module): StudentModule;
}

export interface IUserAccountFactory {
    create(role: RolesEnum, person?: IExtendedPersonSchema, companyName?: string): Promise<UserAccount>;
}

export interface IAddressFactory {
    create(address: IAddress): Address;
    createWithFakeData: () => Address;
}

export interface IConsentFactory {
    create(consent: IConsent): Consent;
    createWithFakeData: () => Consent;
}

export interface IEmployeeFactory {
    create(person: ExtendedPerson, address: IAddress, consent: IConsent, account: IUserAccount): Employee;
    createWithFakeData: () => Promise<Employee>;
}

export interface IStudentFactory {
    create(person: ExtendedPerson, address: IAddress, consent: IConsent, account: IUserAccount): Student;
    createWithFakeData: () => Promise<Student>;
}

export interface IBasicPersonFactory {
    create: (person: IBasicPersonSchema) => BasicPerson;
    createWithFakeData: () => BasicPerson;
}

export interface IExtendedPersonFactory {
    create(person: IExtendedPersonSchema): ExtendedPerson;
    createWithFakeData: () => ExtendedPerson;
}

export interface IRoleFactory {
    create(roleName: string): Role;
    createWithFakeData: () => Role;
}

export interface ICompanyFactory {
    create(company: ICompany, account: IUserAccount, externalParticipants?: IExternalParticipant[]): Company;
    createWithFakeData: () => Company;
}

export interface IExternalParticipantFactory {
    create(externalParticipant: IExternalParticipant, account: IUserAccount, companies?: ICompany[]): ExternalParticipant;
    createWithFakeData: () => ExternalParticipant;
}

export interface IEventFactory {
    create(externalParticipant: IEvent): Event;
    createWithFakeData: () => Event;
}
