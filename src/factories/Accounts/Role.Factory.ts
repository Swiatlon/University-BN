import { Role } from 'entities/Accounts/Role.Entity';

export class RoleFactory {
    create(roleName: string): Role {
        const role = new Role();

        role.name = roleName;

        return role;
    }
}
