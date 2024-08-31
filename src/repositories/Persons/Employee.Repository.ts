import { AppDataSource } from '../../configs/database';
import { DataSource } from 'typeorm';
import { IsNull } from 'typeorm';
import { Employee } from 'entities/Employees/Employee.Entity';
import { EventOrganizerTypeEnum, RolesEnum } from 'constants/entities/entities.Constants';
import { applyFiltersToQuery } from 'utils/Db/RequestFilters/RequestFilters';
import { IUserAllData } from 'types/Accounts/Accounts.Interfaces';
import { IAddress, IConsent } from 'types/Persons/Persons/Persons.Interfaces';

export const EmployeeRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(Employee).extend({
        async findEmployeeWithoutAccount() {
            return this.findBy({
                account: IsNull(),
            });
        },
        async findEmployeeByAccountId(id: string) {
            return this.createQueryBuilder('employee').where('employee.account = :id', { id }).getOne();
        },
        async getUserBasicDataByAccountId(accountId: string) {
            return this.createQueryBuilder('employee').innerJoinAndSelect('employee.organizer', 'eventOrganizer').where('employee.account = :accountId', { accountId }).getOne();
        },
        async getEmployeeAllData(id: string) {
            return this.createQueryBuilder('employee')
                .innerJoinAndSelect('employee.address', 'employeeAddress', 'employeeAddress.id = employee.address')
                .innerJoinAndSelect('employee.consentId', 'employeeConsent', 'employeeConsent.id = employee.consentId')
                .where('employee.id = :id', { id })
                .getOne()
                .then((employee) => {
                    if (employee) {
                        const employeeAddress = { ...(employee.address as IAddress) };
                        const employeeConsent = { ...(employee.consent as IConsent) };

                        const userAllData: IUserAllData = {
                            ...employee,
                            address: employeeAddress,
                            consents: employeeConsent,
                        };

                        return userAllData;
                    }
                    return null;
                });
        },
        async getAllTeachers() {
            const teachersQuery = this.createQueryBuilder('employee')
                .innerJoin('employee.account', 'userAccount')
                .innerJoin('userAccount.roles', 'role')
                .where('role.name = :roleName', { roleName: RolesEnum.TEACHER });

            return applyFiltersToQuery(teachersQuery);
        },

        async findEmployeeByOrganizerId(organizerId: string, organizerType: EventOrganizerTypeEnum) {
            const employee = await this.createQueryBuilder('employee')
                .select(['employee.name', 'employee.surname', 'employee.organizer', 'employee.account'])
                .innerJoinAndSelect('employee.account', 'userAccount')
                .where('employee.organizer = :organizerId', { organizerId })
                .getOne();

            if (employee) {
                return {
                    name: employee.name,
                    surname: employee.surname,
                    organizerId: organizerId,
                    organizerType: organizerType,
                    accountId: employee.account.id,
                };
            }

            return null;
        },
    });
};
