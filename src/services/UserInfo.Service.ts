import { Role } from 'constants/general/general.Constants';
import { Employee } from 'entities/Employees/Employee.Entity';
import { Student } from 'entities/Students/Student.Entity';
import { UserRepository } from 'repositories/Accounts/User.Repository';

export interface UserInfo {
    id: string;
    roles: Role[];
    queryRole: string;
    mainRole: string;
}

interface StudentWithRoles extends Student {
    roles: Role[];
}

interface EmployeeWithRoles extends Employee {
    roles: Role[];
}

type ExtendedUserDataWithRoles = StudentWithRoles | EmployeeWithRoles | { roles: Role[] };

export class UserInfoService {
    async getUserInfo(userInfoData: UserInfo): Promise<ExtendedUserDataWithRoles | null> {
        const { id, queryRole, roles } = userInfoData;

        if (queryRole) {
            const userData = await UserRepository({ queryRole }).getUserBasicData(id);

            if (userData) {
                return { ...userData, roles };
            }
        }

        return null;
    }
}
