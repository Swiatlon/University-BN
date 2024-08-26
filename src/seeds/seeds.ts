//Due to problem with global imporst of seeders we need to pass them directly
import { CreateMissingAccountsForStudents } from './Accounts/MissingAccounts/CreateMissingAccountsForStudents.Seeder';
import { CreateEmployeeAllData } from './AllDatas/CreateEmployeeAllData.Seeder';
import { CreateMissingAccountsForEmployees } from './Accounts/MissingAccounts/CreateMissingAccountsForEmployee.Seeder';
import { CreateRoles } from './Accounts/CreateRoles.Seeder';
import { CreateRolesForAccounts } from './Accounts/MissingAccounts/CreateMissingAccountsRole.Seeder';
import { CreateAdminAccount } from './Accounts/CreateAdminAccount.Seeder';
import { CreateUserAccount } from './Accounts/CreateUserAccount.Seeder';
import { InitializeDegreeProgramsSeeder } from './Courses/InitalizeDegreeProgram/InitalizeDegreePrograms.Seeder';
import { StudentsDegreeSeeder } from './StudentsDegree/StudentsDegree.Seeder';
import { CreateStudentAllData } from './AllDatas/CreateStudentAllData.Seeder';
import { CreateCompanyAllData } from './AllDatas/CreateCompanyAllData.Seeder';
import { CreateEvents } from './Events/CreateEvent.Seeder';

//TODO: Maybe make all seders like createStudentAllData in free time
//TODO: LATER IT WILL BE LIKE DEPEND ON VARIABLE AND DATA SCHEMA LOOKING
const doWeNeedRequired = false;

const _devSeeders = () => {
    return [
        CreateStudentAllData,
        CreateMissingAccountsForStudents,
        CreateEmployeeAllData,
        CreateMissingAccountsForEmployees,
        CreateRolesForAccounts,
        StudentsDegreeSeeder,
        CreateCompanyAllData,
        CreateEvents,
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

// export const SeedersClasses = [_requiredSeeders(), _devSeeders()].flat();
export const SeedersClasses = [_testingSeeders()].flat();
