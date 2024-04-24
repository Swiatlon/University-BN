//Due to problem with global imporst of seeders we need to pass them directly
import { CreateStudentsAndAddresses } from './CreateStudentsAndAddresses';
import { CreateAccountsForStudents } from './CreateAccountsForStudents';
import { CreateEmployeeAndAddresses } from './CreateEmployeeAndAddresses';
import { CreateAccountsForEmployee } from './CreateAccountsForEmployee';
import { CreateRoles } from './CreateRoles';
import { CreateRolesForAccounts } from './CreateRolesForAccounts';
import { CreateAdminAccount } from './CreateAdminAccount';
import { CreateUserAccount } from './CreateUserAccount';

const _devSeeders = () => {
    return [CreateStudentsAndAddresses, CreateAccountsForStudents, CreateEmployeeAndAddresses, CreateAccountsForEmployee, CreateRolesForAccounts];
};

const _requiredSeeders = () => {
    return [CreateRoles, CreateAdminAccount, CreateUserAccount];
};

const _testingSeeders = () => {
    return [];
};

// export const seedersClasses = [_requiredSeeders(), _devSeeders()].flat();
export const seedersClasses = [_testingSeeders()].flat();
