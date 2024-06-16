//Due to problem with global imporst of seeders we need to pass them directly
import { CreateStudents } from './Persons/CreateStudents';
import { CreateAccountsForStudents } from './Accounts/CreateAccountsForStudents';
import { CreateEmployee } from './Persons/CreateEmployee';
import { CreateAccountsForEmployee } from './Accounts/CreateAccountsForEmployee';
import { CreateRoles } from './Accounts/CreateRoles';
import { CreateRolesForAccounts } from './Accounts/CreateRolesForAccounts';
import { CreateAdminAccount } from './Accounts/CreateAdminAccount';
import { CreateUserAccount } from './Accounts/CreateUserAccount';

const _devSeeders = () => {
    return [CreateStudents, CreateAccountsForStudents, CreateEmployee, CreateAccountsForEmployee, CreateRolesForAccounts];
};

const _requiredSeeders = () => {
    return [CreateRoles, CreateAdminAccount, CreateUserAccount];
};

const _testingSeeders = () => {
    return [];
};

export const SeedersClasses = [_requiredSeeders(), _devSeeders()].flat();
// export const seedersClasses = [_testingSeeders()].flat();
