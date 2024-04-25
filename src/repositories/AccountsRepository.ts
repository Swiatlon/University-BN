import { AppDataSource } from '../configs/database';
import { DataSource } from 'typeorm';
import { UserAccount } from 'entities/UserAccountEntity';

export const accountRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(UserAccount).extend({
        async findWithoutRoleAccounts() {
            return this.createQueryBuilder('userAccount').leftJoin('userAccount.roles', 'roles').where('roles.id IS NULL').getMany();
        },
        async findByEmailAccount(email: string) {
            return this.createQueryBuilder('userAccount').where('email = :email', { email }).getOne();
        },
        async findByIdentifierAccount(identifier: string) {
            return this.createQueryBuilder('userAccount')
                .leftJoinAndSelect('userAccount.roles', 'roles')
                .where('userAccount.email = :identifier OR userAccount.login = :identifier', { identifier })
                .getOne();
        },
        async findByLoginWithRolesAccount(login: string) {
            return this.findOne({
                where: { login },
                relations: ['roles'],
            });
        },
    });
};
