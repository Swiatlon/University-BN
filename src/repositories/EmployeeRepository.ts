import { AppDataSource } from '../configs/database';
import { DataSource } from 'typeorm';
import { IsNull } from 'typeorm';
import { Employee } from 'entities/EmployeeEntity';

export const employeeRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(Employee).extend({
        findEmployeeWithoutAccount() {
            return this.findBy({
                accountId: IsNull(),
            });
        },
    });
};
