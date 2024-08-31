import { StudentRepository } from 'repositories/Persons/Student.Repository';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';
import { ExternalParticipantRepository } from 'repositories/Persons/ExternalParticipant.Repository';
import { CompanyRepository } from 'repositories/Persons/Company.Repository';
import { AppDataSource } from 'configs/database';
import { RolesEnum } from 'constants/entities/entities.Constants';

export const getRepositoryByRole = (queryRole: RolesEnum) => {
    switch (queryRole) {
        case RolesEnum.STUDENT:
            return StudentRepository(AppDataSource);
        case RolesEnum.TEACHER:
        case RolesEnum.EMPLOYEE:
            return EmployeeRepository(AppDataSource);
        case RolesEnum.EXTERNAL_PARTICIPANT:
            return ExternalParticipantRepository(AppDataSource);
        case RolesEnum.COMPANY:
            return CompanyRepository(AppDataSource);
        default:
            throw new Error(`No repository found for role: ${queryRole}`);
    }
};
