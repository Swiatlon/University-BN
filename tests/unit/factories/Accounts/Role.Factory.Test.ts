import { RolesEnum } from 'constants/entities/entities.Constants';
import { Role } from 'entities/Accounts/Role.Entity';
import { RoleFactory } from 'factories/Accounts/Role.Factory';

describe('RoleFactory', () => {
    let roleFactory: RoleFactory;

    beforeEach(() => {
        roleFactory = new RoleFactory();
    });

    it('should create a Role with the given name', () => {
        const roleName = RolesEnum.admin;
        const role = roleFactory.create(roleName);

        expect(role).toBeInstanceOf(Role);
        expect(role.name).toBe(roleName);
    });
});
