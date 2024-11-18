import { AppDataSource } from '../../configs/database';
import { DataSource } from 'typeorm';
import { Role } from 'entities/accounts/Role.Entity';
import { RolesEnum } from 'constants/entities/entities.Constants';

export const RolesRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(Role).extend({
        async getRolesAmount() {
            return this.count();
        },

        async createAndSaveRole(roleName: RolesEnum): Promise<Role> {
            const newRole = this.create({ name: roleName });
            return this.save(newRole);
        },
    });
};
