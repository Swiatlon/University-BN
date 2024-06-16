import { Role } from 'entities/Accounts/RoleEntity';

export class RoleFactory {
    create(roleName: string): Role {
        const role = new Role();

        role.name = roleName;

        return role;
    }
}
