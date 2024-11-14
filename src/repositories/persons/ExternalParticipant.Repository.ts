import { AppDataSource } from 'configs/database';
import { EventOrganizerTypeEnum } from 'constants/entities/entities.Constants';
import { ExternalParticipant } from 'entities/externalParticipants/ExternalParticipant.Entity';
import { DataSource, IsNull } from 'typeorm';

export const ExternalParticipantRepository = (customDataSource: DataSource = AppDataSource) => {
    const dataSource = customDataSource;

    return dataSource.getRepository(ExternalParticipant).extend({
        async findExternalParticipantsWithoutAccount() {
            return this.findBy({
                account: IsNull(),
            });
        },

        async getUserBasicDataByAccountId(accountId: number) {
            return this.createQueryBuilder('externalParticipant')
                .innerJoinAndSelect('externalParticipant.organizer', 'eventOrganizer')
                .where('externalParticipant.account = :accountId', { accountId })
                .getOne();
        },

        async findExternalParticipantByAccountId(id: number) {
            return this.createQueryBuilder('externalParticipant').where('externalParticipant.account = :id', { id }).getOne();
        },

        async findExternalParticipantByOrganizerId(organizerId: number, organizerType: EventOrganizerTypeEnum) {
            const externalParticipant = await this.createQueryBuilder('externalParticipant')
                .select(['externalParticipant.name', 'externalParticipant.surname', 'externalParticipant.organizer', 'externalParticipant.account'])
                .innerJoinAndSelect('externalParticipant.account', 'userAccount')
                .where('externalParticipant.organizer = :organizerId', { organizerId })
                .getOne();

            if (externalParticipant) {
                return {
                    name: externalParticipant.name,
                    surname: externalParticipant.surname,
                    organizerId: organizerId,
                    organizerType: organizerType,
                    accountId: externalParticipant.account.id,
                };
            }

            return null;
        },
    });
};
