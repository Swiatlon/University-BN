import { Role } from 'entities/Accounts/Role.Entity';
import { IRoleFactory } from 'types/Factories/Factories.Interfaces';

export class RoleFactory implements IRoleFactory {
    create(roleName: string): Role {
        const role = new Role();

        role.name = roleName;

        return role;
    }
}
