import { RolesEnums } from 'constants/general/generalConstants';
import { Student } from 'entities/StudentEntity';
import { Employee } from 'entities/EmployeeEntity';
import { studentRepository } from 'repositories/StudentRepository';
import { employeeRepository } from 'repositories/EmployeeRepository';
import { Role } from 'constants/general/generalConstants';

export interface UserInfo {
    id: string;
    roles: Role[];
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
        const { id } = userInfoData;
        const roles = userInfoData.roles.map((role) => role.name);

        for (const role of roles) {
            switch (role) {
                case RolesEnums.student: {
                    const student = await studentRepository().findStudentByAccountId(id);
                    if (student) {
                        return { ...student, roles: userInfoData.roles };
                    }
                    break;
                }
                case RolesEnums.teacher: {
                    const employee = await employeeRepository().findEmployeeByAccountId(id);
                    if (employee) {
                        return { ...employee, roles: userInfoData.roles };
                    }
                    break;
                }
                case RolesEnums.admin: {
                    return { roles: userInfoData.roles, name: 'Admin', surname: '' };
                }
                default:
                    break;
            }
        }

        return null;
    }
}
