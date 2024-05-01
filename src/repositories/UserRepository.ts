import { AppDataSource } from '../configs/database';
import { DataSource } from 'typeorm';
import { getSelectFieldsFromContext } from 'middlewares/visibilityFieldsFilters';
import { IUserAllData } from 'interfaces/IUserAccount';
import { IAddress } from 'interfaces/IAddress';

export const userRepository = ({ customDataSource = AppDataSource, queryRole }: { customDataSource?: DataSource; queryRole: string }) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(queryRole).extend({
        async findUserByAccountId(id: string) {
            return this.createQueryBuilder(queryRole).where(`${queryRole}.accountId = :id`, { id }).getOne();
        },
        async getUserBasicData(id: string) {
            const selectFields = getSelectFieldsFromContext(queryRole);

            return this.createQueryBuilder(queryRole).select(selectFields).where(`${queryRole}.id = :id`, { id }).getOne();
        },
        async getUserAllData(id: string) {
            return this.createQueryBuilder(queryRole)
                .innerJoinAndSelect(`${queryRole}.addressId`, `${queryRole}Address`, `${queryRole}Address.id = ${queryRole}.addressId`)
                .where(`${queryRole}.id = :id`, { id })
                .getOne()
                .then((user) => {
                    if (user) {
                        const userAddress = { ...(user.addressId as unknown as IAddress) };
                        const userAllData = {
                            ...userAddress,
                            ...user,
                            addressId: userAddress.id,
                        } as IUserAllData;

                        return userAllData;
                    }

                    return null;
                });
        },
    });
};
