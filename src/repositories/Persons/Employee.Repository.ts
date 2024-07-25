import { AppDataSource } from '../../configs/database';
import { DataSource } from 'typeorm';
import { IsNull } from 'typeorm';
import { Employee } from 'entities/Employees/Employee.Entity';
import { IUserAllData } from 'interfaces/Accounts/IAccounts';
import { IAddress, IConsent } from 'interfaces/Persons/IPersons';
import { RolesEnum } from 'constants/entities/entities.Constants';
import { applyFiltersToQuery } from 'utils/Db/RequestFilters/RequestFilters';

export const EmployeeRepository = (customDataSource: DataSource = AppDataSource) => {
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
            return this.createQueryBuilder('employee').where('employee.id = :id', { id }).getOne();
        },
        async getEmployeeAllData(id: string) {
            return this.createQueryBuilder('employee')
                .innerJoinAndSelect('employee.addressId', 'employeeAddress', 'employeeAddress.id = employee.addressId')
                .innerJoinAndSelect('employee.consentId', 'employeeConsent', 'employeeConsent.id = employee.consentId')
                .where('employee.id = :id', { id })
                .getOne()
                .then((employee) => {
                    if (employee) {
                        const employeeAddress = { ...(employee.address as unknown as IAddress) };
                        const employeeConsent = { ...(employee.consent as unknown as IConsent) };
                        const userAllData: IUserAllData = {
                            ...employee,
                            ...employeeAddress,
                            ...employeeConsent,
                            id: employee.id,
                            address: employeeAddress.id,
                            consent: employeeConsent.id,
                        };

                        return userAllData;
                    }
                    return null;
                });
        },
        async getAllTeachers() {
            const teachersQuery = this.createQueryBuilder('employee')
                .innerJoin('employee.accountId', 'userAccount')
                .innerJoin('userAccount.roles', 'role')
                .where('role.name = :roleName', { roleName: RolesEnum.teacher });

            return applyFiltersToQuery(teachersQuery);
        },
    });
};
