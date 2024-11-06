/* eslint-disable @typescript-eslint/no-unused-vars */
//Due to problem with global imporst of seeders we need to pass them directly
import { CreateMissingAccountsForStudents } from './accounts/missingAccounts/CreateMissingAccountsForStudents.Seeder';
import { CreateEmployeeAllData } from './allDatas/CreateEmployeeAllData.Seeder';
import { CreateMissingAccountsForEmployees } from './accounts/missingAccounts/CreateMissingAccountsForEmployee.Seeder';
import { CreateRoles } from './accounts/CreateRoles.Seeder';
import { CreateRolesForAccounts } from './accounts/missingAccounts/CreateMissingAccountsRole.Seeder';
import { CreateAdminAccount } from './accounts/CreateAdminAccount.Seeder';
import { CreateUserAccount } from './accounts/CreateUserAccount.Seeder';
import { InitializeDegreeProgramsSeeder } from './courses/initalizeDegreeProgram/InitalizeDegreePrograms.Seeder';
import { StudentsDegreeSeeder } from './studentsDegree/StudentsDegree.Seeder';
import { CreateStudentAllData } from './allDatas/CreateStudentAllData.Seeder';
import { CreateCompanyAllData } from './allDatas/CreateCompanyAllData.Seeder';
import { CreateStudentsGrades } from './grades/CreateStudentsGrades.Seeder';

//TODO: Maybe make all seders like createStudentAllData in free time
//TODO: LATER IT WILL BE LIKE DEPEND ON VARIABLE AND DATA SCHEMA LOOKING
const doWeNeedRequired = false;

const _devSeeders = () => {
    return [
        // CreateStudentAllData,
        // CreateMissingAccountsForStudents,
        // CreateEmployeeAllData,
        // CreateMissingAccountsForEmployees,
        // CreateRolesForAccounts,
        // StudentsDegreeSeeder,
        // CreateCompanyAllData,
        CreateStudentsGrades,
    ];
};

const _requiredSeeders = () => {
    if (doWeNeedRequired) {
        return [CreateRoles, CreateAdminAccount, CreateUserAccount, InitializeDegreeProgramsSeeder];
    }

    return [];
};

const _testingSeeders = () => {
    return [];
};

//export const SeedersClasses = [_requiredSeeders(), _devSeeders()].flat();
export const SeedersClasses = [_testingSeeders()].flat();
