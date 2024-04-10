import { AppDataSource } from '../configs/database';
import { DataSource } from 'typeorm';
import { UserAccount } from 'entities/UserAccountEntity';

export const accountRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(UserAccount).extend({
        async findAccountsWithoutRole() {
            return this.createQueryBuilder('userAccount').leftJoin('userAccount.roles', 'roles').where('roles.id IS NULL').getMany();
        },
        async findByEmailAccount(email: string) {
            return this.createQueryBuilder('userAccount').where('email = :email', { email }).getOne();
        },
        async findByAccountIdentifier(identifier: string) {
            return this.createQueryBuilder('userAccount').where('userAccount.email = :identifier OR userAccount.login = :identifier', { identifier }).getOne();
        },
        async findAccountByLoginWithRoles(login: string) {
            return this.findOne({
                where: { login },
                relations: ['roles'],
            });
        },
    });
};
