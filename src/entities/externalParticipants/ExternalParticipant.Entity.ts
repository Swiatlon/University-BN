import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { UserAccount } from 'entities/accounts/UserAccount.Entity';
import { Company } from 'entities/companies/Company.Entity';
import { BasicPerson } from 'entities/schemas/BasicPerson.Schema';
import { EventOrganizer } from 'entities/events/EventOrganizer.Entity';
import { IExternalParticipant } from 'types/persons/externalParticipants/ExternalParticipants.Interfaces';

@Entity('External_Participants')
export class ExternalParticipant extends BasicPerson implements IExternalParticipant {
    @PrimaryGeneratedColumn()
    id!: string;

    @ManyToOne(() => UserAccount, { nullable: false })
    @JoinColumn({ name: 'account_id' })
    account!: UserAccount;

    @ManyToOne(() => EventOrganizer, { cascade: true, nullable: true })
    @JoinColumn({
        name: 'organizer_id',
    })
    organizer?: EventOrganizer;

    @ManyToMany(() => Company, (company) => company.externalParticipants, { nullable: true })
    @JoinTable({
        name: 'Company_External_Participants',
        joinColumn: {
            name: 'external_participant_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'company_id',
            referencedColumnName: 'id',
        },
    })
    companies?: Company[];
}
