import { Role } from 'entities/RoleEntity';

export class RoleFactory {
    create(roleName: string): Role {
        const role = new Role();

        role.name = roleName;

        return role;
    }
}
