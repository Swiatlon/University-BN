import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';
import { ICommunityService } from 'types/Services/Services.Interfaces';

export class CommunityService implements ICommunityService {
    async getAllTeachers() {
        return await EmployeeRepository().getAllTeachers();
    }
}
