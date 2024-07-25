import { RolesEnum } from 'constants/entities/entities.Constants';
import { Role } from 'entities/Accounts/Role.Entity';
import { UserAccount } from 'entities/Accounts/UserAccount.Entity';
import { DegreeCourse } from 'entities/Courses/DegreeCourse.Entity';
import { DegreePath } from 'entities/Courses/DegreePath.Entity';
import { Module } from 'entities/Courses/Module.Entity';
import { Subject } from 'entities/Courses/Subject.Entity';
import { Employee } from 'entities/Employees/Employee.Entity';
import { Address } from 'entities/Schemas/Address.Schema';
import { Consent } from 'entities/Schemas/Consent.Schema';
import { Person } from 'entities/Schemas/Person.Schema';
import { StudentDegreeCourse } from 'entities/StudentDegrees/StudentDegreeCourse.Entity';
import { StudentDegreePath } from 'entities/StudentDegrees/StudentDegreePath.Entity';
import { StudentModule } from 'entities/StudentDegrees/StudentModule.Entity';
import { Student } from 'entities/Students/Student.Entity';

export interface IRoleFactory {
    create(roleName: string): Role;
}

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

export interface IAddressFactory {
    create(): Address;
}

export interface IConsentFactory {
    create(): Consent;
}

export interface IEmployeeFactory {
    create(addressId: string, consentId: string): Employee;
}

export interface IPersonFactory {
    create(): Person;
}

export interface IStudentFactory {
    create(addressId: string, consentId: string): Student;
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
    createAccount(role: RolesEnum, person?: Person): Promise<UserAccount>;
}
