import { AppDataSource } from '../configs/database';
import { DataSource } from 'typeorm';
import { getSelectFieldsFromContext } from 'middlewares/visibilityFieldsFilters';
import { IUserAllData } from 'interfaces/IUserAccount';
import { IAddress } from 'interfaces/IAddress';
import { IConsent } from 'interfaces/IConsent';

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
                .innerJoinAndSelect(`${queryRole}.consentId`, `${queryRole}Consent`, `${queryRole}Consent.id = ${queryRole}.consentId`)
                .where(`${queryRole}.id = :id`, { id })
                .getOne()
                .then((user) => {
                    if (user) {
                        const userAddress = { ...(user.addressId as unknown as IAddress) };
                        const userConsent = { ...(user.consentId as unknown as IConsent) };
                        const userAllData = {
                            ...userAddress,
                            ...userConsent,
                            ...user,
                            addressId: userAddress.id,
                            consentId: userConsent.id,
                        } as IUserAllData;

                        return userAllData;
                    }

                    return null;
                });
        },
    });
};
