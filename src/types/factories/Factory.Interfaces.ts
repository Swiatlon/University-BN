import { RolesEnum } from 'constants/entities/entities.Constants';
import { Role } from 'entities/accounts/Role.Entity';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { Company } from 'entities/companies/Company.Entity';
import { DegreeCourse } from 'entities/courses/DegreeCourse.Entity';
import { DegreePath } from 'entities/courses/DegreePath.Entity';
import { Module } from 'entities/courses/Module.Entity';
import { Subject } from 'entities/courses/Subject.Entity';
import { Employee } from 'entities/employees/Employee.Entity';
import { Event } from 'entities/events/Event.Entity';
import { ExternalParticipant } from 'entities/externalParticipants/ExternalParticipant.Entity';
import { Address } from 'entities/schemas/Address.Schema';
import { BasicPerson } from 'entities/schemas/BasicPerson.Schema';
import { Consent } from 'entities/schemas/Consent.Schema';
import { ExtendedPerson } from 'entities/schemas/ExtendedPerson.Schema';
import { StudentDegreeCourse } from 'entities/studentDegrees/StudentDegreeCourse.Entity';
import { StudentDegreePath } from 'entities/studentDegrees/StudentDegreePath.Entity';
import { StudentModule } from 'entities/studentDegrees/StudentModule.Entity';
import { Student } from 'entities/students/Student.Entity';
import { IUserAccount } from 'types/accounts/Accounts.Interfaces';
import { ICompany } from 'types/companies/Companies.Interfaces';
import { IEvent } from 'types/events/Events.Interfaces';
import { IExternalParticipant } from 'types/persons/externalParticipants/ExternalParticipants.Interfaces';
import { IAddress, IBasicPersonSchema, IConsent, IExtendedPersonSchema } from 'types/persons/persons/Persons.Interfaces';

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
