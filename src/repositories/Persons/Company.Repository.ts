import { AppDataSource } from 'configs/database';
import { EventOrganizerTypeEnum } from 'constants/entities/entities.Constants';
import { Company } from 'entities/Companies/Company.Entity';
import { DataSource, IsNull } from 'typeorm';

export const CompanyRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(Company).extend({
        async findCompaniesWithoutAccount() {
            return this.findBy({
                account: IsNull(),
            });
        },

        async findCompanyByAccountId(id: string) {
            return this.createQueryBuilder('company').where('company.account = :id', { id }).getOne();
        },

        async findCompanyByOrganizerId(organizerId: string, organizerType: EventOrganizerTypeEnum) {
            const company = await this.createQueryBuilder('company')
                .select(['company.name', 'company.account', 'company.organizer'])
                .innerJoinAndSelect('company.account', 'userAccount')
                .where('company.organizer = :organizerId', { organizerId })
                .getOne();

            if (company) {
                return {
                    name: company.name,
                    address: company.address,
                    organizerId: organizerId,
                    organizerType: organizerType,
                    accountId: company.account.id,
                };
            }

            return null;
        },
    });
};
