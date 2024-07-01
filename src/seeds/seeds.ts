//Due to problem with global imporst of seeders we need to pass them directly
import { CreateStudents } from './Persons/CreateStudents';
import { CreateAccountsForStudents } from './Accounts/CreateAccountsForStudents';
import { CreateEmployee } from './Persons/CreateEmployee';
import { CreateAccountsForEmployee } from './Accounts/CreateAccountsForEmployee';
import { CreateRoles } from './Accounts/CreateRoles';
import { CreateRolesForAccounts } from './Accounts/CreateRolesForAccounts';
import { CreateAdminAccount } from './Accounts/CreateAdminAccount';
import { CreateUserAccount } from './Accounts/CreateUserAccount';
import { InitializeDegreeProgramsSeeder } from './Courses/InitalizeDegreeProgram/InitalizeDegreePrograms';
import { StudentsDegreeSeeder } from './StudentsDegree/StudentsDegree.Seeder';

//TODO: LATER IT WILL BE LIKE DEPEND ON VARIABLE AND DATA SCHEMA LOOKING
const doWeNeedRequired = true;

const _devSeeders = () => {
    return [CreateStudents, CreateAccountsForStudents, CreateEmployee, CreateAccountsForEmployee, CreateRolesForAccounts, StudentsDegreeSeeder];
};

const _requiredSeeders = () => {
    if (doWeNeedRequired) {
        return [CreateRoles, CreateAdminAccount, CreateUserAccount, InitializeDegreeProgramsSeeder];
    }

    return [];
};

const _testingSeeders = () => {
    return [CreateAccountsForStudents];
};

export const SeedersClasses = [_requiredSeeders(), _devSeeders()].flat();
// export const SeedersClasses = [_testingSeeders()].flat();
