import { Faker, faker } from '@faker-js/faker';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { Role } from 'entities/accounts/Role.Entity';
import { IRoleFactory } from 'types/factories/Factory.Interfaces';

export class RoleFactory implements IRoleFactory {
    private faker: Faker = faker;

    create(roleName: string): Role {
        const role = new Role();
        role.name = roleName;

        return role;
    }

    createWithFakeData(): Role {
        const role = new Role();
        role.name = this.faker.helpers.arrayElement([RolesEnum.COMPANY, RolesEnum.EMPLOYEE, RolesEnum.EXTERNAL_PARTICIPANT, RolesEnum.STUDENT]);

        return role;
    }
}
