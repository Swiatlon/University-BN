import { AppDataSource } from '../configs/database';
import { DataSource } from 'typeorm';
import { IsNull } from 'typeorm';
import { Employee } from 'entities/EmployeeEntity';
import { getSelectFieldsFromContext } from 'middlewares/visibilityFieldsFilters';
import { IUserAllData } from 'interfaces/IUserAccount';
import { IAddress } from 'interfaces/IAddress';

export const employeeRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(Employee).extend({
        async findEmployeeWithoutAccount() {
            return this.findBy({
                accountId: IsNull(),
            });
        },
        async findEmployeeByAccountId(id: string) {
            return this.createQueryBuilder('employee').where('employee.accountId = :id', { id }).getOne();
        },
        async getEmployeeBasicData(id: string) {
            const selectFields = getSelectFieldsFromContext('employee');

            return this.createQueryBuilder('employee').select(selectFields).where('employee.id = :id', { id }).getOne();
        },
        async getEmployeeAllData(id: string) {
            return this.createQueryBuilder('employee')
                .innerJoinAndSelect('employee.addressId', 'employeeAddress', 'employeeAddress.id = employee.addressId')
                .where('employee.id = :id', { id })
                .getOne()
                .then((employee) => {
                    if (employee) {
                        const employeeAddress = { ...(employee.addressId as unknown as IAddress) };
                        const userAllData: IUserAllData = {
                            ...employee,
                            ...employeeAddress,
                            id: employee.id,
                            addressId: employeeAddress.id as string,
                        };

                        return userAllData;
                    }
                    return null;
                });
        },
    });
};
