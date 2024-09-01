import { DataSource } from 'typeorm';
import { EventOrganizer } from 'entities/Events/EventOrganizer.Entity';
import { AppDataSource } from 'configs/database';
import { EventOrganizerTypeEnum } from 'constants/entities/entities.Constants';
import { EmployeeRepository } from 'repositories/Persons/Employee.Repository';
import { CompanyRepository } from 'repositories/Persons/Company.Repository';
import { ExternalParticipantRepository } from 'repositories/Persons/ExternalParticipant.Repository';

export const EventOrganizerRepository = (dataSource: DataSource = AppDataSource) => {
    return dataSource.getRepository(EventOrganizer).extend({
        async findOneRandom(): Promise<EventOrganizer | null> {
            const count = await this.count();

            if (count === 0) {
                return null;
            }

            const randomOffset = Math.floor(Math.random() * count);

            return this.createQueryBuilder('eventOrganizer').skip(randomOffset).take(1).getOne();
        },

        async getAllEventOrganizers(): Promise<any[]> {
            const organizers = await this.createQueryBuilder('eventOrganizer').getMany();

            const detailedOrganizers = await Promise.all(
                organizers.map(async (organizer) => {
                    switch (organizer.organizerType) {
                        case EventOrganizerTypeEnum.EMPLOYEE: {
                            const employees = await EmployeeRepository().findEmployeeByOrganizerId(organizer.id, organizer.organizerType);
                            return employees;
                        }
                        case EventOrganizerTypeEnum.COMPANY: {
                            const company = await CompanyRepository().findCompanyByOrganizerId(organizer.id, organizer.organizerType);
                            return company;
                        }
                        case EventOrganizerTypeEnum.EXTERNAL_PARTICIPANT: {
                            const externalParticipant = await ExternalParticipantRepository().findExternalParticipantByOrganizerId(organizer.id, organizer.organizerType);
                            return externalParticipant;
                        }
                        default:
                            return null;
                    }
                })
            );

            return detailedOrganizers;
        },

        async findByIds(ids: string[]): Promise<EventOrganizer[]> {
            return this.createQueryBuilder('eventOrganizer').where('eventOrganizer.id IN (:...ids)', { ids }).getMany();
        },
    });
};
