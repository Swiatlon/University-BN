import { ICommunityService } from 'interfaces/Services/IServices';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';

export class CommunityService implements ICommunityService {
    async getAllTeachers() {
        return await EmployeeRepository().getAllTeachers();
    }
}
