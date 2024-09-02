import { StudentRepository } from 'repositories/persons/Student.Repository';
import { EmployeeRepository } from 'repositories/persons/Employee.Repository';
import { ExternalParticipantRepository } from 'repositories/persons/ExternalParticipant.Repository';
import { CompanyRepository } from 'repositories/persons/Company.Repository';
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
