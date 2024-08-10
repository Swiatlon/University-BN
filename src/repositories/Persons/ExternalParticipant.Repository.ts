import { AppDataSource } from 'configs/database';
import { ExternalParticipant } from 'entities/ExternalParticipants/ExternalParticipant.Entity';
import { DataSource, IsNull } from 'typeorm';

export const ExternalParticipantRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(ExternalParticipant).extend({
        async findExternalParticipantsWithoutAccount() {
            return this.findBy({
                account: IsNull(),
            });
        },

        async findExternalParticipantByAccountId(id: string) {
            return this.createQueryBuilder('externalParticipant').where('externalParticipant.account = :id', { id }).getOne();
        },
    });
};
