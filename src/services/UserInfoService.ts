import { Student } from 'entities/StudentEntity';
import { Employee } from 'entities/EmployeeEntity';
import { Role } from 'constants/general/generalConstants';
import { userRepository } from 'repositories/UserRepository';

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
            const userData = await userRepository({ queryRole }).getUserBasicData(id);

            if (userData) {
                return { ...userData, roles };
            }
        }

        return null;
    }
}
