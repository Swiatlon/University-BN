import { AppDataSource } from 'configs/database';
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
    });
};
