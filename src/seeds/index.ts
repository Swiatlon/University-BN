//Due to problem with global imporst of seeders we need to pass them directly
import { CreateStudents } from './CreateStudents';
import { CreateAccountsForStudents } from './CreateAccountsForStudents';
import { CreateEmployee } from './CreateEmployee';
import { CreateAccountsForEmployee } from './CreateAccountsForEmployee';
import { CreateRoles } from './CreateRoles';
import { CreateRolesForAccounts } from './CreateRolesForAccounts';
import { CreateAdminAccount } from './CreateAdminAccount';
import { CreateUserAccount } from './CreateUserAccount';

const _devSeeders = () => {
    return [CreateStudents, CreateAccountsForStudents, CreateEmployee, CreateAccountsForEmployee, CreateRolesForAccounts];
};

const _requiredSeeders = () => {
    return [CreateRoles, CreateAdminAccount, CreateUserAccount];
};

const _testingSeeders = () => {
    return [];
};

export const seedersClasses = [_requiredSeeders(), _devSeeders()].flat();
// export const seedersClasses = [_testingSeeders()].flat();
